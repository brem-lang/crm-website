import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    return (
        <>
            <Head title="Log in" />

            <div className="grid min-h-svh lg:grid-cols-2">
                {/* Decorative brand panel */}
                <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 lg:flex">
                    {/* Starfield */}
                    <div
                        className="absolute inset-0 opacity-60"
                        style={{
                            backgroundImage:
                                'radial-gradient(1px 1px at 20% 15%, rgba(255,255,255,0.5) 1px, transparent 0), radial-gradient(1px 1px at 60% 8%, rgba(255,255,255,0.4) 1px, transparent 0), radial-gradient(1px 1px at 80% 25%, rgba(255,255,255,0.35) 1px, transparent 0), radial-gradient(1px 1px at 35% 40%, rgba(255,255,255,0.3) 1px, transparent 0), radial-gradient(1px 1px at 10% 55%, rgba(255,255,255,0.4) 1px, transparent 0), radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.3) 1px, transparent 0), radial-gradient(1px 1px at 50% 75%, rgba(255,255,255,0.35) 1px, transparent 0), radial-gradient(1px 1px at 25% 90%, rgba(255,255,255,0.3) 1px, transparent 0)',
                            backgroundSize: '100% 100%',
                        }}
                    />

                    {/* Concentric radar rings */}
                    <div className="absolute top-1/2 left-1/3 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/10" />
                    <div className="absolute top-1/2 left-1/3 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/10" />
                    <div className="absolute top-1/2 left-1/3 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/10" />

                    {/* Ambient glow */}
                    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

                    {/* Brand mark */}
                    <div className="relative z-10 flex items-center gap-2 px-16 pt-12">
                        {/* <AppLogoIcon className="size-6 fill-current text-sky-400" /> */}
                        <span className="text-lg font-semibold text-white">
                            AlphaMaster<span className="text-sky-400">CRM</span>
                        </span>
                    </div>

                    {/* Ascending dashed path */}
                    <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 600 900"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <path
                            d="M180 780 C 170 700, 210 650, 190 600 C 170 540, 130 500, 150 440 C 170 370, 260 340, 300 260 C 330 200, 320 140, 340 90"
                            stroke="#fbbf24"
                            strokeOpacity="0.6"
                            strokeWidth="2"
                            strokeDasharray="6 8"
                            strokeLinecap="round"
                            className="animate-dash-flow"
                        />
                        <circle cx="180" cy="780" r="4" fill="#fbbf24" />
                        <circle cx="190" cy="600" r="4" fill="#fbbf24" />
                        <circle
                            cx="340"
                            cy="90"
                            r="4"
                            fill="#fbbf24"
                            className="animate-climb-pulse"
                        />
                    </svg>

                    {/* Floating pipeline card */}
                    <div className="relative z-10 mt-16 mr-16 ml-auto w-[19rem] rounded-xl border border-slate-700/50 bg-slate-900/80 p-4 shadow-2xl shadow-black/40 backdrop-blur-sm">
                        <div className="flex items-start justify-between gap-3">
                            <p className="text-sm leading-snug font-semibold text-white">
                                Northwind
                                <br />
                                Traders
                            </p>
                            <span className="rounded-md bg-sky-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-sky-300 uppercase">
                                Negotiation
                            </span>
                        </div>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-700/60">
                            <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-sky-400 to-amber-400" />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                            <span className="text-slate-400">Stage 3 of 4</span>
                            <span className="font-medium text-white">
                                $68,000
                            </span>
                        </div>
                    </div>

                    {/* Field notes */}
                    <div className="relative z-10 px-16 pb-12">
                        <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-widest text-sky-400/80 uppercase">
                            <span className="h-px w-6 bg-sky-400/50" />
                            Field notes
                        </p>
                        <h2 className="max-w-md text-4xl leading-tight font-bold text-white">
                            Some pipelines climb.
                            <br />
                            Yours summits.
                        </h2>
                        <p className="mt-4 max-w-sm text-sm text-slate-400">
                            No lead goes cold at base camp. Follow every account
                            from first outreach to the close, mapped stage by
                            stage.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-300">
                            <span className="size-1.5 rounded-full bg-amber-400" />
                            <span className="font-semibold text-white">
                                1,240
                            </span>
                            accounts guided to close this year
                        </div>
                    </div>

                    {/* Telemetry footer */}
                    <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 px-16 py-4 font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                        <span>Lat 46.8523° N</span>
                        <span>
                            Alt <span className="text-slate-300">4,810M</span>
                        </span>
                        <span>
                            Status{' '}
                            <span className="text-slate-300">Ascending</span>
                        </span>
                    </div>
                </div>

                {/* Login form */}
                <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-28">
                    <div className="mx-auto w-full max-w-sm">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Log in to your account
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Enter your email and password to continue your
                            climb.
                        </p>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="mt-8 flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="name@company.com"
                                                className="h-11 rounded-lg focus-visible:border-blue-500 focus-visible:ring-blue-500/40"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                className="h-11 rounded-lg focus-visible:border-blue-500 focus-visible:ring-blue-500/40"
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-sky-400 data-[state=checked]:to-blue-600"
                                            />
                                            <Label htmlFor="remember">
                                                Remember me
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-2 h-11 w-full rounded-lg border-0 bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-md shadow-blue-500/30 transition-all hover:from-sky-500 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing && <Spinner />}
                                            Log in
                                            <ArrowRight className="size-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>

                        {status && (
                            <div className="mt-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
