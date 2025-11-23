import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

import { LockIcon } from "@/icons/LockIcon";
import { DatabaseIcon } from "@/icons/DatabaseIcon";
import { PhoneIcon } from "@/icons/PhoneIcon";
import { DownloadIcon } from "@/icons/DownloadIcon";
import { SparklesIcon } from "@/icons/SparklesIcon";
import { MailIcon } from "@/icons/MailIcon";
import { TrendingUpIcon } from "@/icons/TrendingUpIcon";
import { UsersIcon } from "@/icons/UsersIcon";
import { ChevronRightIcon } from "@/icons/ChevronRightIcon";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { getAllUsers, getSavedNumbers, updateGoldPrice } from "@/integrations/api";
import { User, UserMobile } from "@/lib/types";
import SVSLogo from "@/assets/svslogo.png";

const AdminPortal = () => {
	const { toast } = useToast();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [goldRate, setGoldRate] = useState("");
	const [silverRate, setSilverRate] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [activeSection, setActiveSection] = useState("rate");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleLogin = () => {
		if (!email || !password) {
			toast({
				title: "Missing Credentials",
				description: "Please enter both email and password",
				variant: "destructive",
			});
			return;
		}

		if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
			setIsAuthenticated(true);
			toast({
				title: "Welcome Back! ✨",
				description: "Successfully logged into admin portal",
			});
			setEmail("");
			setPassword("");
		} else {
			toast({
				title: "Authentication Failed",
				description: "Invalid email or password. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleGoldRateSubmit = () => {
		if (!goldRate || parseFloat(goldRate) <= 0) {
			toast({
				title: "Invalid Input",
				description: "Please enter a valid gold rate",
				variant: "destructive",
			});
			return;
		}

		setIsSubmitting(true);
		updateGoldPrice({ gold_price: parseFloat(goldRate), silver_price: parseFloat(silverRate) })
			.then((response) => {
				if (response.data) {
					toast({
						title: "Rate Updated! 🎉",
						description: `Gold rate set to ₹${goldRate}/gram & Silver rate set to ₹${silverRate}`,
					});
					setGoldRate("");
					setSilverRate("");
				}
			})
			.catch(() => {
				toast({
					title: "Update Failed",
					description: "Could not update gold rate. Please try again.",
					variant: "destructive",
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	const formatDateToIST = (dateString: string) => {
		const date = new Date(dateString + "Z");

		return date.toLocaleString("en-IN", {
			timeZone: "Asia/Kolkata",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true,
		});
	};

	const autoFitColumns = (worksheet, jsonData) => {
		const objectMaxLength = [];

		jsonData.forEach((row) => {
			Object.keys(row).forEach((key, colIndex) => {
				const cellValue = row[key] ? row[key].toString() : "";
				objectMaxLength[colIndex] = Math.max(
					objectMaxLength[colIndex] || 10,
					cellValue.length
				);
			});
		});

		worksheet["!cols"] = objectMaxLength.map((width) => ({
			wch: width + 2,
		}));
	};


	const downloadUsersData = () => {
		getAllUsers()
			.then((data) => {
				const transformedData = data.map((user: User) => ({
					'Serial Number': user.id,
					'Full Name': user.name,
					'Gold Weight': user.goldWeight,
					'Mobile Number': user.mobileNumber,
					'Location': user.location,
					'Bank': user.bank,
					'Loan Amount': user.loanAmount,
					'Enquiry Type': user.type,
					'Registration Date': formatDateToIST(user.createdAt),
				}));

				const worksheet = XLSX.utils.json_to_sheet(transformedData);

				autoFitColumns(worksheet, transformedData);

				const workbook = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
				XLSX.writeFile(workbook, `users_${new Date().toISOString().split('T')[0]}.xlsx`);

				toast({
					title: "Download Complete! 📊",
					description: `${transformedData.length} users exported successfully`,
				});
			})
			.catch((error) => {
				toast({
					title: "Export Failed",
					description: "Could not download users data",
					variant: "destructive",
				});
			});
	};

	const downloadMobileNumbers = () => {
		getSavedNumbers()
			.then((data) => {
				const transformedData = data.map((user: UserMobile) => ({
					'Serial Number': user.id,
					'Mobile Number': user.mobileNumber,
					'Registration Date': formatDateToIST(user.lastLogin),
				}));

				const worksheet = XLSX.utils.json_to_sheet(transformedData);

				autoFitColumns(worksheet, transformedData);

				const workbook = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(workbook, worksheet, "Mobile Numbers");
				XLSX.writeFile(workbook, `mobile_${new Date().toISOString().split('T')[0]}.xlsx`);

				toast({
					title: "Download Complete! 📱",
					description: `${transformedData.length} mobile numbers exported successfully`,
				});
			})
			.catch((error) => {
				toast({
					title: "Export Failed",
					description: "Could not download mobile numbers",
					variant: "destructive",
				});
			});
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (!isAuthenticated) {
				handleLogin();
			} else if (e.target.id === 'gold-rate') {
				handleGoldRateSubmit();
			}
		}
	};

	if (!isAuthenticated) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
				{/* Animated Grid Background */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />

				{/* Glowing Orbs */}
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />

				{/* Floating Particles */}
				<div className="absolute inset-0">
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 3}s`,
								animationDuration: `${2 + Math.random() * 3}s`
							}}
						/>
					))}
				</div>

				<div className="relative z-10 w-full max-w-md">
					<div className="bg-slate-900/50 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-800/50">
						{/* Header */}
						<div className="text-center mb-8 flex items-center flex-col">
							<img
								src={SVSLogo}
								alt="SVS Gold Logo"
								className="w-[130px] h-[60px] mb-6"
							/>
							<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
								Admin Portal
							</h1>
							<p className="text-slate-400 text-sm">Secure access to your dashboard</p>
						</div>

						{/* Login Form */}
						<div className="space-y-5">
							<div className="space-y-2">
								<label htmlFor="email" className="block text-sm font-medium text-slate-300">
									Email Address
								</label>
								<div className="relative group">
									<div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
										<MailIcon className="w-5 h-5" />
									</div>
									<input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										onKeyPress={handleKeyPress}
										placeholder="admin@svsgold.com"
										className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label htmlFor="password" className="block text-sm font-medium text-slate-300">
									Password
								</label>
								<div className="relative group">
									<div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
										<LockIcon className="w-5 h-5" />
									</div>
									<input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										onKeyPress={handleKeyPress}
										placeholder="Enter your password"
										className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-800 bg-slate-950/50 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
									/>
								</div>
							</div>

							<button
								onClick={handleLogin}
								className="w-full py-3 h-13 rounded-xl bg-gradient-to-r from-primary via-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-primary-foreground font-semibold text-base mt-6 group relative overflow-hidden"
							>
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
								<span className="relative flex items-center justify-center gap-2">
									Access Dashboard
									<ChevronRightIcon stroke="white" />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const menuItems = [
		{ id: "rate", label: "Gold Rate", icon: TrendingUpIcon, description: "Update market rates" },
		{ id: "users", label: "Users Data", icon: UsersIcon, description: "Export user database" },
		{ id: "mobile", label: "Mobile Numbers", icon: PhoneIcon, description: "Export contacts" },
	];

	return (
		<div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col md:flex-row overflow-hidden relative">
			{/* Background */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />
			<div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
			<div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />

			{/* Mobile Header */}
			<div className="md:hidden relative z-10 bg-slate-900/50 backdrop-blur-2xl border-b border-slate-800/50">
				<div className="p-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<img
							src={SVSLogo}
							alt="SVS Gold Logo"
							className="w-[100px] h-[60px]"
						/>
						<div className="flex-1 min-w-0">
							<h1 className="text-base font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent truncate">
								SVS Gold Dashboard
							</h1>
							<p className="text-slate-500 text-xs truncate">{import.meta.env.VITE_ADMIN_EMAIL}</p>
						</div>
					</div>
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="w-10 h-10 rounded-lg bg-slate-950/50 border border-slate-800 flex items-center justify-center hover:bg-slate-800/50 transition-colors"
					>
						<svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{isMobileMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Menu Dropdown */}
				{isMobileMenuOpen && (
					<div className="border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-2xl absolute z-2">
						<div className="p-2 space-y-2">
							{menuItems.map((item) => {
								const Icon = item.icon;
								const isActive = activeSection === item.id;
								return (
									<button
										key={item.id}
										onClick={() => {
											setActiveSection(item.id);
											setIsMobileMenuOpen(false);
										}}
										className={`w-full p-3 rounded-xl transition-all duration-300 ${isActive
											? "bg-gradient-to-r from-primary via-primary to-accent shadow-lg shadow-primary/20"
											: "bg-slate-950/30 hover:bg-slate-800/50 border border-slate-800/50"
											}`}
									>
										<div className="flex items-center gap-3">
											<div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isActive ? "bg-white/20" : "bg-slate-800/50"
												}`}>
												<Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-slate-400"}`} />
											</div>
											<div className="flex-1 text-left">
												<div className={`font-semibold text-sm ${isActive ? "text-primary-foreground" : "text-slate-300"}`}>
													{item.label}
												</div>
												<div className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-slate-500"}`}>
													{item.description}
												</div>
											</div>
										</div>
									</button>
								);
							})}
							<button
								onClick={() => {
									setIsAuthenticated(false);
									setGoldRate("");
									setActiveSection("rate");
									setIsMobileMenuOpen(false);
									window.location.href = "/";
								}}
								className="w-full p-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 transition-all text-slate-300 hover:text-red-400 group"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center">
										<LogoutIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
									</div>
									<span className="font-semibold text-sm">Logout</span>
								</div>
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden md:flex relative z-10 w-80 bg-slate-900/50 backdrop-blur-2xl border-r border-slate-800/50 flex-col">
				{/* Sidebar Header */}
				<div className="p-6 border-b border-slate-800/50">
					<div className="flex items-center gap-3">
						<img
							src={SVSLogo}
							alt="SVS Gold Logo"
							className="w-[80px] h-[50px]"
						/>
						<div className="flex-1 min-w-0">
							<h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent truncate">
								SVS Gold Dashboard
							</h1>
							<p className="text-slate-500 text-xs truncate">{import.meta.env.VITE_ADMIN_EMAIL}</p>
						</div>
					</div>
				</div>

				{/* Navigation Menu */}
				<div className="flex-1 p-4 space-y-2 overflow-y-auto">
					{menuItems.map((item) => {
						const Icon = item.icon;
						const isActive = activeSection === item.id;
						return (
							<button
								key={item.id}
								onClick={() => setActiveSection(item.id)}
								className={`w-full p-4 rounded-xl transition-all duration-300 group ${isActive
									? "bg-gradient-to-r from-primary via-primary to-accent shadow-lg shadow-primary/20"
									: "bg-slate-950/30 hover:bg-slate-800/50 border border-slate-800/50 hover:border-slate-700"
									}`}
							>
								<div className="flex items-center gap-3">
									<div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${isActive ? "bg-white/20" : "bg-slate-800/50 group-hover:bg-slate-700/50"
										}`}>
										<Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-slate-400 group-hover:text-slate-300"}`} />
									</div>
									<div className="flex-1 text-left">
										<div className={`font-semibold text-sm ${isActive ? "text-primary-foreground" : "text-slate-300"}`}>
											{item.label}
										</div>
										<div className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-slate-500"}`}>
											{item.description}
										</div>
									</div>
									<ChevronRightIcon className="w-5 h-5" stroke="white" />
								</div>
							</button>
						);
					})}
				</div>

				{/* Sidebar Footer */}
				<div className="p-4 border-t border-slate-800/50">
					<button
						onClick={() => {
							setIsAuthenticated(false);
							setGoldRate("");
							setActiveSection("rate");
						}}
						className="w-full px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 transition-all font-medium text-sm text-slate-300 hover:text-red-400 group"
					>
						<span className="flex items-center justify-center gap-2">
							<LogoutIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
							<span>Logout</span>
						</span>
					</button>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="relative z-1 flex-1 overflow-y-auto flex items-center justify-center p-4 md:p-8">
				<div className="w-full max-w-2xl">
					{activeSection === "rate" && (
						<div>
							<div className="mb-6 md:mb-8 flex flex-col md:flex-row items-center gap-3 md:gap-4">
								<div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/20">
									<TrendingUpIcon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
								</div>
								<div className="flex flex-col items-center md:items-start text-center md:text-left">
									<h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Gold Rate Update</h2>
									<p className="text-sm md:text-base text-slate-400">Set current market rate per gram</p>
								</div>
							</div>

							<div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800/50 shadow-2xl">
								<div className="space-y-6">

									{/* Gold Rate Field */}
									<div>
										<label htmlFor="gold-rate" className="block text-base font-medium text-slate-300 mb-3">
											Gold Rate (₹/gram)
										</label>
										<input
											id="gold-rate"
											type="number"
											value={goldRate}
											onChange={(e) => setGoldRate(e.target.value)}
											onKeyPress={handleKeyPress}
											placeholder="Enter current gold rate"
											step="0.01"
											className="w-full h-14 px-5 rounded-xl border-2 border-slate-800 bg-slate-950/50 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
										/>
									</div>

									{/* Silver Rate Field */}
									<div>
										<label htmlFor="silver-rate" className="block text-base font-medium text-slate-300 mb-3">
											Silver Rate (₹/gram)
										</label>
										<input
											id="silver-rate"
											type="number"
											value={silverRate}
											onChange={(e) => setSilverRate(e.target.value)}
											onKeyPress={handleKeyPress}
											placeholder="Enter current silver rate"
											step="0.01"
											className="w-full h-14 px-5 rounded-xl border-2 border-slate-800 bg-slate-950/50 text-white text-lg placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
										/>
									</div>

									<button
										onClick={handleGoldRateSubmit}
										disabled={isSubmitting}
										className="w-full h-14 rounded-xl bg-gradient-to-r from-primary via-primary to-accent hover:shadow-lg hover:shadow-primary/25 disabled:from-primary/50 disabled:to-accent/50 disabled:cursor-not-allowed transition-all duration-300 text-primary-foreground font-semibold text-base group relative overflow-hidden"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
										<span className="relative">{isSubmitting ? "Updating Rate..." : "Update Rates"}</span>
									</button>

								</div>
							</div>

						</div>
					)}

					{activeSection === "users" && (
						<div>
							<div className="mb-8 text-center flex items-center gap-4">
								<div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/20">
									<UsersIcon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
								</div>
								<div className="flex flex-col items-start">
									<h2 className="text-3xl font-bold text-white mb-2">Users Database</h2>
									<p className="text-slate-400">Export complete user records</p>
								</div>
							</div>

							<div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800/50 shadow-2xl">
								<div className="space-y-6">
									<div className="flex items-start gap-4 p-6 bg-slate-950/50 rounded-xl border border-slate-800/30">
										<DatabaseIcon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
										<div>
											<h3 className="text-lg font-semibold text-white mb-2">Export User Data</h3>
											<p className="text-slate-400 text-sm leading-relaxed">
												Download a complete Excel spreadsheet containing all registered users with their details, registration dates, and activity information.
											</p>
										</div>
									</div>

									<button
										onClick={downloadUsersData}
										className="w-full h-14 rounded-xl bg-gradient-to-r from-primary via-primary to-accent hover:shadow-lg hover:shadow-primary/25 disabled:from-primary/50 disabled:to-accent/50 disabled:cursor-not-allowed transition-all duration-300 text-primary-foreground font-semibold text-base group relative overflow-hidden"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
										<span className="relative flex items-center justify-center gap-2">
											<DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
											Download Users Data
										</span>
									</button>
								</div>
							</div>
						</div>
					)}

					{activeSection === "mobile" && (
						<div>
							<div className="mb-8 text-center flex items-center gap-4">
								<div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/20">
									<PhoneIcon className="w-6 h-6 md:w-8 md:h-8 text-accent" />
								</div>
								<div className="flex flex-col items-start">
									<h2 className="text-3xl font-bold text-white mb-2">Contact Numbers</h2>
									<p className="text-slate-400">Export mobile number list</p>
								</div>
							</div>

							<div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800/50 shadow-2xl">
								<div className="space-y-6">
									<div className="flex items-start gap-4 p-6 bg-slate-950/50 rounded-xl border border-slate-800/30">
										<DatabaseIcon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
										<div>
											<h3 className="text-lg font-semibold text-white mb-2">Export Contact List</h3>
											<p className="text-slate-400 text-sm leading-relaxed">
												Download an Excel file with all registered mobile numbers for marketing campaigns, SMS notifications, and customer outreach.
											</p>
										</div>
									</div>

									<button
										onClick={downloadMobileNumbers}
										className="w-full h-14 rounded-xl bg-gradient-to-r from-primary via-primary to-accent hover:shadow-lg hover:shadow-primary/25 disabled:from-primary/50 disabled:to-accent/50 disabled:cursor-not-allowed transition-all duration-300 text-primary-foreground font-semibold text-base group relative overflow-hidden"
									>
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
										<span className="relative flex items-center justify-center gap-2">
											<DownloadIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
											Download Mobile Numbers
										</span>
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminPortal;