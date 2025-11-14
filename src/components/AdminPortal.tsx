// import { useState } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { Input } from "@/components/ui/input";
// import { Download, Eye, EyeOff } from "lucide-react";
// import AdminGoldRate from "./AdminGoldRate";

// const ADMIN_PASSWORD = "svsgold@admin2024"; // Hardcoded password

// const AdminPortal = () => {
//   const { toast } = useToast();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Download states
//   const [sellGoldDateRange, setSellGoldDateRange] = useState({ from: "", to: "" });
//   const [releasePledgeDateRange, setReleasePledgeDateRange] = useState({ from: "", to: "" });
//   const [liveRateDateRange, setLiveRateDateRange] = useState({ from: "", to: "" });

//   const handleLogin = () => {
//     if (password === ADMIN_PASSWORD) {
//       setIsAuthenticated(true);
//       toast({
//         title: "Welcome Admin!",
//         description: "You have successfully logged in",
//       });
//     } else {
//       toast({
//         title: "Access Denied",
//         description: "Invalid password. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const exportToCSV = (data: any[], filename: string) => {
//     if (data.length === 0) {
//       toast({
//         title: "No Data",
//         description: "No records found for the selected date range",
//         variant: "destructive",
//       });
//       return;
//     }

//     const headers = Object.keys(data[0]).join(",");
//     const rows = data.map((row) =>
//       Object.values(row)
//         .map((val) => `"${val}"`)
//         .join(",")
//     );

//     const csv = [headers, ...rows].join("\n");
//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     a.click();
//     window.URL.revokeObjectURL(url);

//     toast({
//       title: "Downloaded!",
//       description: `${filename} has been downloaded successfully`,
//     });
//   };

//   const downloadSellGoldForms = async () => {
//     setIsLoading(true);
//     try {
//       let query = supabase.from("sell_gold_forms").select("*");

//       if (sellGoldDateRange.from) {
//         query = query.gte("submitted_at", sellGoldDateRange.from);
//       }
//       if (sellGoldDateRange.to) {
//         const toDate = new Date(sellGoldDateRange.to);
//         toDate.setHours(23, 59, 59, 999);
//         query = query.lte("submitted_at", toDate.toISOString());
//       }

//       const { data, error } = await query.order("submitted_at", { ascending: false });

//       if (error) throw error;

//       exportToCSV(data || [], `sell-gold-forms-${new Date().toISOString().split("T")[0]}.csv`);
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         title: "Download Failed",
//         description: "Failed to download sell gold forms",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const downloadReleasePledgeForms = async () => {
//     setIsLoading(true);
//     try {
//       let query = supabase.from("release_pledge_forms").select("*");

//       if (releasePledgeDateRange.from) {
//         query = query.gte("submitted_at", releasePledgeDateRange.from);
//       }
//       if (releasePledgeDateRange.to) {
//         const toDate = new Date(releasePledgeDateRange.to);
//         toDate.setHours(23, 59, 59, 999);
//         query = query.lte("submitted_at", toDate.toISOString());
//       }

//       const { data, error } = await query.order("submitted_at", { ascending: false });

//       if (error) throw error;

//       exportToCSV(
//         data || [],
//         `release-pledge-forms-${new Date().toISOString().split("T")[0]}.csv`
//       );
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         title: "Download Failed",
//         description: "Failed to download release pledge forms",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const downloadLiveRateViews = async () => {
//     setIsLoading(true);
//     try {
//       let query = supabase.from("live_rate_views").select("*");

//       if (liveRateDateRange.from) {
//         query = query.gte("viewed_at", liveRateDateRange.from);
//       }
//       if (liveRateDateRange.to) {
//         const toDate = new Date(liveRateDateRange.to);
//         toDate.setHours(23, 59, 59, 999);
//         query = query.lte("viewed_at", toDate.toISOString());
//       }

//       const { data, error } = await query.order("viewed_at", { ascending: false });

//       if (error) throw error;

//       exportToCSV(data || [], `live-rate-views-${new Date().toISOString().split("T")[0]}.csv`);
//     } catch (error) {
//       console.error("Error:", error);
//       toast({
//         title: "Download Failed",
//         description: "Failed to download live rate views",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
//         <div className="w-full max-w-md">
//           <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-primary/20">
//             <div className="text-center space-y-4 mb-8">
//               <h2 className="text-3xl font-bold text-foreground">Admin Portal</h2>
//               <p className="text-muted-foreground">Enter password to access admin panel</p>
//             </div>

//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-foreground font-medium text-sm">Password</label>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleLogin()}
//                     placeholder="Enter admin password"
//                     className="pr-12 h-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 onClick={handleLogin}
//                 className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 text-primary-foreground font-semibold text-lg shadow-[var(--shadow-gold)]"
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-secondary py-12">
//       <div className="container mx-auto px-4">
//         <div className="max-w-6xl mx-auto space-y-12">
//           <div className="text-center space-y-4">
//             <h1 className="text-4xl md:text-5xl font-bold text-foreground">Admin Portal</h1>
//             <p className="text-lg text-muted-foreground">Manage gold rates and download reports</p>
//             <button
//               onClick={() => setIsAuthenticated(false)}
//               className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
//             >
//               Logout
//             </button>
//           </div>

//           {/* Gold Rate Management */}
//           <AdminGoldRate />

//           {/* Download Reports Section */}
//           <div className="bg-card rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-primary/20">
//             <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Download Reports</h2>

//             <div className="space-y-8">
//               {/* Sell Gold Forms */}
//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold text-foreground">Sell Gold Form Submissions</h3>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   <Input
//                     type="date"
//                     value={sellGoldDateRange.from}
//                     onChange={(e) =>
//                       setSellGoldDateRange({ ...sellGoldDateRange, from: e.target.value })
//                     }
//                     className="h-12"
//                   />
//                   <Input
//                     type="date"
//                     value={sellGoldDateRange.to}
//                     onChange={(e) =>
//                       setSellGoldDateRange({ ...sellGoldDateRange, to: e.target.value })
//                     }
//                     className="h-12"
//                   />
//                   <button
//                     onClick={downloadSellGoldForms}
//                     disabled={isLoading}
//                     className="h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 transition-all duration-300 text-primary-foreground font-semibold flex items-center justify-center gap-2"
//                   >
//                     <Download size={20} />
//                     Download
//                   </button>
//                 </div>
//               </div>

//               {/* Release Pledge Forms */}
//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold text-foreground">
//                   Release Pledge Form Submissions
//                 </h3>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   <Input
//                     type="date"
//                     value={releasePledgeDateRange.from}
//                     onChange={(e) =>
//                       setReleasePledgeDateRange({ ...releasePledgeDateRange, from: e.target.value })
//                     }
//                     className="h-12"
//                   />
//                   <Input
//                     type="date"
//                     value={releasePledgeDateRange.to}
//                     onChange={(e) =>
//                       setReleasePledgeDateRange({ ...releasePledgeDateRange, to: e.target.value })
//                     }
//                     className="h-12"
//                   />
//                   <button
//                     onClick={downloadReleasePledgeForms}
//                     disabled={isLoading}
//                     className="h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 transition-all duration-300 text-primary-foreground font-semibold flex items-center justify-center gap-2"
//                   >
//                     <Download size={20} />
//                     Download
//                   </button>
//                 </div>
//               </div>

//               {/* Live Rate Views */}
//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold text-foreground">Live Rate View Mobile Numbers</h3>
//                 <div className="grid md:grid-cols-3 gap-4">
//                   <Input
//                     type="date"
//                     value={liveRateDateRange.from}
//                     onChange={(e) =>
//                       setLiveRateDateRange({ ...liveRateDateRange, from: e.target.value })
//                     }
//                     className="h-12"
//                   />
//                   <Input
//                     type="date"
//                     value={liveRateDateRange.to}
//                     onChange={(e) =>
//                       setLiveRateDateRange({ ...liveRateDateRange, to: e.target.value })
//                     }
//                     className="h-12"
//                   />
//                   <button
//                     onClick={downloadLiveRateViews}
//                     disabled={isLoading}
//                     className="h-12 rounded-xl bg-primary hover:bg-primary/90 disabled:bg-primary/50 transition-all duration-300 text-primary-foreground font-semibold flex items-center justify-center gap-2"
//                   >
//                     <Download size={20} />
//                     Download
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPortal;
