'use client';

import { useEffect, useState } from 'react';
import { Check, X, Calendar, CreditCard, Crown } from 'lucide-react';

interface SubscriptionDetails {
  plan: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

interface SubscriptionSuccessModalProps {
  onClose: () => void;
  sessionId: string;
}

export default function SubscriptionSuccessModal({
  onClose,
  sessionId,
}: SubscriptionSuccessModalProps) {
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndFetchSubscription = async () => {
      try {
        const token = localStorage.getItem('authToken');

        // First, verify the checkout session and sync the subscription
        const verifyResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/verify-session`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sessionId }),
          }
        );

        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
          // Subscription synced successfully, use the returned data
          setSubscriptionDetails(verifyData.data.subscription);
        } else {
          // If verification fails, try fetching existing subscription
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/subscription`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          if (data.success) {
            setSubscriptionDetails(data.data.subscription);
          }
        }
      } catch (error) {
        console.error('Failed to verify and fetch subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyAndFetchSubscription();
  }, [sessionId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case 'pro':
        return {
          name: 'Pro',
          price: '$19',
          color: 'from-blue-600 to-purple-600',
          icon: <Crown className="w-8 h-8" />,
        };
      case 'team':
        return {
          name: 'Team',
          price: '$49',
          color: 'from-purple-600 to-pink-600',
          icon: <Crown className="w-8 h-8" />,
        };
      default:
        return {
          name: 'Free',
          price: '$0',
          color: 'from-gray-600 to-gray-700',
          icon: <Check className="w-8 h-8" />,
        };
    }
  };

  const planDetails = subscriptionDetails ? getPlanDetails(subscriptionDetails.plan) : null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${planDetails?.color || 'from-green-600 to-emerald-600'} p-8 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-white/90">Your subscription is now active</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : subscriptionDetails ? (
            <div className="space-y-6">
              {/* Plan Info */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`bg-gradient-to-r ${planDetails?.color} p-3 rounded-lg text-white`}>
                      {planDetails?.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {planDetails?.name} Plan
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {planDetails?.price}/month
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {subscriptionDetails.status}
                  </div>
                </div>

                {/* Subscription Period - Only show for paid plans */}
                {subscriptionDetails.plan !== 'free' && subscriptionDetails.currentPeriodStart && (
                  <div className="space-y-3 mt-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Billing Period Started
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white font-semibold">
                          {formatDate(subscriptionDetails.currentPeriodStart)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Next Billing Date
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white font-semibold">
                          {formatDate(subscriptionDetails.currentPeriodEnd)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-2">
                  🎉 What's unlocked:
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  {planDetails?.name === 'Pro' && (
                    <>
                      <li>✓ Unlimited messages</li>
                      <li>✓ Advanced AI model (GPT-4)</li>
                      <li>✓ Priority support</li>
                    </>
                  )}
                  {planDetails?.name === 'Team' && (
                    <>
                      <li>✓ Everything in Pro</li>
                      <li>✓ Up to 10 team members</li>
                      <li>✓ Team analytics</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Start Using {planDetails?.name}
              </button>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                A confirmation email has been sent to your inbox
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                Unable to load subscription details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
