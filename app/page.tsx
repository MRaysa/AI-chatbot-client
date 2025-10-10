'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '@/components/ui/Button';
import {
  Sparkles,
  MessageSquare,
  Zap,
  Shield,
  Brain,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Globe,
  Rocket
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!loading && user) {
      router.push('/chat');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 dark:border-purple-900"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 dark:border-blue-400 absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{
            top: '-10%',
            left: '-5%',
          }}
        />
        <div
          className="absolute w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            bottom: '-10%',
            right: '-5%',
          }}
        />
        <div
          className="absolute w-64 h-64 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-2xl"
          style={{
            top: `${mousePosition.y / 10}px`,
            left: `${mousePosition.x / 10}px`,
            transition: 'all 0.3s ease-out',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Chat Boot
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800 mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Powered by Advanced AI Technology
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                Chat Smarter
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Work Faster
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of AI conversations. Get instant answers, creative solutions, and intelligent assistance available 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg border-2 hover:bg-white/50 dark:hover:bg-gray-800/50 backdrop-blur-sm transition-all duration-300"
                >
                  View Pricing
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="relative max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-1 border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-8">
                <div className="space-y-4">
                  {/* Demo Message 1 */}
                  <div className="flex gap-3 animate-in fade-in slide-in-from-left duration-700 delay-500">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0"></div>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none p-4 shadow-md max-w-md">
                      <p className="text-gray-800 dark:text-gray-200">
                        How can AI Chat Boot help me today?
                      </p>
                    </div>
                  </div>

                  {/* Demo Message 2 */}
                  <div className="flex gap-3 justify-end animate-in fade-in slide-in-from-right duration-700 delay-700">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rounded-tr-none p-4 shadow-md max-w-md">
                      <p className="text-white">
                        I can help with writing, coding, analysis, creative tasks, and much more. Just ask me anything!
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose AI Chat Boot?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built with cutting-edge technology to deliver the best AI experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Experience blazing-fast responses powered by state-of-the-art AI models. Get instant answers without any delays.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your conversations are encrypted end-to-end. We prioritize your privacy and never share your data.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Smart & Intuitive
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Advanced context understanding and learning capabilities. Chat naturally like you would with a human.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Always Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                24/7 availability across all devices. Access your AI assistant anytime, anywhere, on any device.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Work together with your team. Share conversations, insights, and collaborate in real-time.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-rose-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Constantly Improving
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Regular updates and improvements. We're always adding new features and enhancing performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
              <div className="absolute top-20 right-20 w-3 h-3 bg-yellow-300 rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-blue-300 rounded-full animate-bounce delay-700"></div>
              <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-200"></div>
              <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-yellow-300 animate-pulse delay-400" />
              <Sparkles className="absolute bottom-1/4 right-1/4 w-5 h-5 text-white animate-pulse delay-600" />
            </div>

            {/* Glowing orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="relative z-10 p-12 md:p-20 text-center">
              {/* Animated icon container */}
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-full border-2 border-white/30 shadow-2xl">
                  <Star className="w-16 h-16 text-yellow-300 animate-spin-slow" />
                </div>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom duration-700">
                Ready to Transform <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Your Workflow?</span>
                  <div className="absolute bottom-2 left-0 right-0 h-3 bg-yellow-300/50 -rotate-1"></div>
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-200">
                Join <span className="font-bold text-yellow-300">10,000+</span> professionals using AI Chat Boot
              </p>

              <p className="text-lg text-white/80 mb-10 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
                Work smarter, create faster, achieve more
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
                <Link href="/register">
                  <Button
                    variant="primary"
                    size="lg"
                    className="group relative bg-white dark:bg-white text-purple-600 dark:text-purple-600 hover:bg-yellow-50 dark:hover:bg-yellow-50 px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-yellow-300/50 transition-all duration-300 hover:scale-110 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative flex items-center gap-3 text-purple-600">
                      <Rocket className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                      Start Free Trial
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                </Link>

                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-10 py-5 text-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    View Plans
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-white/90 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="font-medium">No credit card</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="font-medium">Free forever</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="font-medium">Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 AI Chat Boot. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
