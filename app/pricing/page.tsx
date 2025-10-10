'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Check, ArrowLeft, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our AI assistant',
      features: [
        '10 messages per day',
        'Basic AI responses',
        'Standard response time',
        'Community support',
      ],
      current: true,
      buttonText: 'Current Plan',
      buttonDisabled: true,
      planId: 'free',
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals who need more power',
      features: [
        'Unlimited messages',
        'Advanced AI model (GPT-4)',
        'Priority response time',
        'Email support',
        'Custom instructions',
        'Chat history export',
        'API access',
      ],
      popular: true,
      buttonText: 'Upgrade to Pro',
      gradient: 'from-blue-600 to-purple-600',
      planId: 'pro',
    },
    {
      name: 'Team',
      price: '$49',
      period: 'per month',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Shared chat workspaces',
        'Team analytics',
        'Advanced admin controls',
        'Priority support',
        'Custom integrations',
        'Dedicated account manager',
      ],
      buttonText: 'Contact Sales',
      gradient: 'from-purple-600 to-pink-600',
      planId: 'team',
    },
  ];

  const handleUpgrade = async (planName: string, planId: string) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (planId === 'free') return;

    setLoading(planId);

    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan: planId }),
        }
      );

      const data = await response.json();

      if (data.success && data.data.url) {
        window.location.href = data.data.url;
      } else {
        console.error('Failed to create checkout session:', data.message);
        alert('Failed to create checkout session. Please try again.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push('/chat')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Chat</span>
        </button>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Upgrade Your Experience</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose the Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock the full potential of AI with our flexible pricing plans designed for individuals and teams
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-600 dark:ring-purple-500' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleUpgrade(plan.name, plan.planId)}
                  disabled={plan.buttonDisabled || loading === plan.planId}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 mb-8 ${
                    plan.buttonDisabled
                      ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                      : plan.gradient
                      ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg hover:scale-105`
                      : 'bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                  } ${loading === plan.planId ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {loading === plan.planId ? 'Processing...' : plan.buttonText}
                </button>

                {/* Features */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                    What's included:
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 14-day money-back guarantee. Need help choosing?{' '}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
