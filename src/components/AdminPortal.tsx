import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

const AdminPortal = () => {
    const { toast } = useToast();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [goldRate, setGoldRate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = () => {
        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            toast({
                title: "Login Successful",
                description: "Welcome to Admin Portal",
            });
            setPassword("");
        } else {
            toast({
                title: "Invalid Password",
                description: "Please try again",
                variant: "destructive",
            });
        }
    };

    const handleGoldRateSubmit = async () => {
        if (!goldRate) {
            toast({
                title: "Error",
                description: "Please enter gold rate",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            // Add your API call here to submit gold rate
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast({
                title: "Success",
                description: "Gold rate updated successfully",
            });
            setGoldRate("");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update gold rate",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const downloadUsersData = async () => {
        try {
            // Replace this with your actual API call
            const response = await fetch("/api/users");
            const data = await response.json();

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
            XLSX.writeFile(workbook, `users_data_${new Date().toISOString().split('T')[0]}.xlsx`);

            toast({
                title: "Success",
                description: "Users data downloaded successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to download users data",
                variant: "destructive",
            });
        }
    };

    const downloadMobileNumbers = async () => {
        try {
            // Replace this with your actual API call
            const response = await fetch("/api/mobile-numbers");
            const data = await response.json();

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Mobile Numbers");
            XLSX.writeFile(workbook, `mobile_numbers_${new Date().toISOString().split('T')[0]}.xlsx`);

            toast({
                title: "Success",
                description: "Mobile numbers downloaded successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to download mobile numbers",
                variant: "destructive",
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (!isAuthenticated) {
                handleLogin();
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-muted flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Admin Portal</h1>
                            <p className="text-muted-foreground">Enter your credentials to continue</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-foreground font-medium text-sm">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter admin password"
                                    className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <button
                                onClick={handleLogin}
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold text-base"
                            >
                                Login to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen py-20 bg-muted relative overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                            <p className="text-lg text-muted-foreground">Manage your business data</p>
                        </div>
                        <button
                            onClick={() => {
                                setIsAuthenticated(false);
                                setGoldRate("");
                            }}
                            className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary bg-card hover:bg-muted transition-all text-foreground font-medium"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Gold Rate Update Card */}
                        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Update Gold Rate</h2>
                            <p className="text-muted-foreground mb-6">Set the current gold rate per gram</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 space-y-2">
                                    <label htmlFor="gold-rate" className="block text-foreground font-medium text-sm">
                                        Gold Rate (₹/gram)
                                    </label>
                                    <input
                                        id="gold-rate"
                                        type="number"
                                        value={goldRate}
                                        onChange={(e) => setGoldRate(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleGoldRateSubmit();
                                            }
                                        }}
                                        placeholder="Enter current rate"
                                        step="0.01"
                                        className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                <button
                                    onClick={handleGoldRateSubmit}
                                    disabled={isSubmitting}
                                    className="sm:mt-7 h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold whitespace-nowrap"
                                >
                                    {isSubmitting ? "Updating..." : "Update Rate"}
                                </button>
                            </div>
                        </div>

                        {/* Data Export Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Users Data Export */}
                            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border">
                                <h2 className="text-2xl font-bold text-foreground mb-2">Export Users Data</h2>
                                <p className="text-muted-foreground mb-6">Download complete user database in Excel format</p>

                                <button
                                    onClick={downloadUsersData}
                                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold flex items-center justify-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    Download Users Data
                                </button>
                            </div>

                            {/* Mobile Numbers Export */}
                            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-[var(--shadow-card)] border border-border">
                                <h2 className="text-2xl font-bold text-foreground mb-2">Export Mobile Numbers</h2>
                                <p className="text-muted-foreground mb-6">Download all mobile numbers in Excel format</p>

                                <button
                                    onClick={downloadMobileNumbers}
                                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-[var(--shadow-gold)] transition-all duration-300 text-primary-foreground font-semibold flex items-center justify-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    Download Mobile Numbers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminPortal;