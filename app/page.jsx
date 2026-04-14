// "use client";
// import { useEffect } from "react";  // ✅ ADD HERE
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, Stethoscope } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { creditBenefits, features, testimonials } from "@/lib/data";

// export default function Home() {


//    useEffect(() => {
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission();
//     }
//   }, []);
//   return (
//     <div className="bg-background">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden py-32">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <Badge
//                 variant="outline"
//                 className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium"
//               >
//                 Healthcare made simple
//               </Badge>

//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
//                 Connect with doctors <br />
//                 <span className="gradient-title">anytime, anywhere</span>
//               </h1>

//               <p className="text-muted-foreground text-lg md:text-xl max-w-md">
//                 Book appointments, consult via video, and manage your healthcare
//                 journey all in one secure platform.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button
//                   asChild
//                   size="lg"
//                   className="bg-emerald-600 text-white hover:bg-emerald-700"
//                 >
//                   <Link href="/onboarding">
//                     Get Started <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>

//                 <Button
//                   asChild
//                   variant="outline"
//                   size="lg"
//                   className="border-emerald-700/30 hover:bg-muted/80"
//                 >
//                   <Link href="/doctors">Find Doctors</Link>
//                 </Button>
//               </div>
//             </div>

//             <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
//               <Image
//                 src="/banner2.png"
//                 alt="Doctor consultation"
//                 fill
//                 priority
//                 className="object-cover md:pt-14 rounded-xl"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               How It Works
//             </h2>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Our platform makes healthcare accessible with just a few clicks
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all"
//               >
//                 <CardHeader className="pb-2">
//                   <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
//                     {feature.icon}
//                   </div>
//                   <CardTitle className="text-xl font-semibold text-white">
//                     {feature.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground">
//                     {feature.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Credit System Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <Card className="bg-muted/20 border-emerald-900/30 max-w-4xl mx-auto">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-white flex items-center">
//                 <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
//                 How Our Credit System Works
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-3">
//                 {creditBenefits.map((benefit, index) => (
//                   <li key={index} className="flex items-start">
//                     <p
//                       className="text-muted-foreground"
//                       dangerouslySetInnerHTML={{ __html: benefit }}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {testimonials.map((t, i) => (
//               <Card key={i} className="border-emerald-900/20">
//                 <CardContent className="pt-6">
//                   <h4 className="font-semibold text-white">{t.name}</h4>
//                   <p className="text-sm text-muted-foreground">{t.role}</p>
//                   <p className="mt-3 text-muted-foreground">
//                     &quot;{t.quote}&quot;
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section style={{ backgroundColor: "#0a0a0a", padding: "60px 20px" }}>
//     <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

//       {/* Section heading */}
//       <div style={{ textAlign: "center", marginBottom: "40px" }}>
//         <span style={{
//           backgroundColor: "#00c89622",
//           color: "#00c896",
//           fontSize: "12px",
//           fontWeight: "600",
//           padding: "4px 12px",
//           borderRadius: "999px",
//           display: "inline-block",
//           marginBottom: "12px"
//         }}>
//           AI-Powered
//         </span>
//         <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: "700", margin: "0 0 8px" }}>
//           Smart Health Features
//         </h2>
//         <p style={{ color: "#777", fontSize: "15px" }}>
//           Advanced AI tools to help you understand your health better
//         </p>
//       </div>

//       {/* Feature cards row */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>

//         {/* Card 1 */}
//         <Link href="/symptom-checker" style={{ textDecoration: "none" }}>
//           <div style={{
//             backgroundColor: "#111",
//             border: "1px solid #1f1f1f",
//             borderRadius: "16px",
//             padding: "28px",
//             cursor: "pointer",
//             transition: "border-color 0.2s"
//           }}
//             onMouseEnter={e => e.currentTarget.style.borderColor = "#00c89655"}
//             onMouseLeave={e => e.currentTarget.style.borderColor = "#1f1f1f"}
//           >
//             <div style={{ fontSize: "32px", marginBottom: "16px" }}>🧠</div>
//             <span style={{
//               backgroundColor: "#00c89622", color: "#00c896",
//               fontSize: "11px", fontWeight: "600",
//               padding: "2px 10px", borderRadius: "999px",
//               display: "inline-block", marginBottom: "12px"
//             }}>
//               Powered by ML
//             </span>
//             <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
//               AI Symptom Checker
//             </h3>
//             <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px" }}>
//               Select your symptoms and get AI-powered disease predictions with department recommendations.
//             </p>
//             <span style={{ color: "#00c896", fontSize: "13px", fontWeight: "600" }}>
//               Try it →
//             </span>
//           </div>
//         </Link>

//         {/* Card 2 */}
//         <Link href="/ocr" style={{ textDecoration: "none" }}>
//           <div style={{
//             backgroundColor: "#111",
//             border: "1px solid #1f1f1f",
//             borderRadius: "16px",
//             padding: "28px",
//             cursor: "pointer",
//             transition: "border-color 0.2s"
//           }}
//             onMouseEnter={e => e.currentTarget.style.borderColor = "#00c89655"}
//             onMouseLeave={e => e.currentTarget.style.borderColor = "#1f1f1f"}
//           >
//             <div style={{ fontSize: "32px", marginBottom: "16px" }}>📄</div>
//             <span style={{
//               backgroundColor: "#00c89622", color: "#00c896",
//               fontSize: "11px", fontWeight: "600",
//               padding: "2px 10px", borderRadius: "999px",
//               display: "inline-block", marginBottom: "12px"
//             }}>
//               OCR + AI
//             </span>
//             <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
//               Medical Report Scanner
//             </h3>
//             <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px" }}>
//               Upload a photo of your prescription or report. We extract text and detect medicines automatically.
//             </p>
//             <span style={{ color: "#00c896", fontSize: "13px", fontWeight: "600" }}>
//               Scan now →
//             </span>
//           </div>
//         </Link>

//         {/* Card 3 */}
//         <Link href="/dashboard" style={{ textDecoration: "none" }}>
//           <div style={{
//             backgroundColor: "#111",
//             border: "1px solid #1f1f1f",
//             borderRadius: "16px",
//             padding: "28px",
//             cursor: "pointer",
//             transition: "border-color 0.2s"
//           }}
//             onMouseEnter={e => e.currentTarget.style.borderColor = "#00c89655"}
//             onMouseLeave={e => e.currentTarget.style.borderColor = "#1f1f1f"}
//           >
//             <div style={{ fontSize: "32px", marginBottom: "16px" }}>📊</div>
//             <span style={{
//               backgroundColor: "#00c89622", color: "#00c896",
//               fontSize: "11px", fontWeight: "600",
//               padding: "2px 10px", borderRadius: "999px",
//               display: "inline-block", marginBottom: "12px"
//             }}>
//               Analytics
//             </span>
//             <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
//               Health Dashboard
//             </h3>
//             <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px" }}>
//               Track weight, blood pressure, and sugar levels over time with interactive graphs.
//             </p>
//             <span style={{ color: "#00c896", fontSize: "13px", fontWeight: "600" }}>
//               View dashboard →
//             </span>
//           </div>
//         </Link>

//       </div>

//       {/* View all button */}
//       <div style={{ textAlign: "center", marginTop: "32px" }}>
//         <Link href="/ai-features" style={{
//           backgroundColor: "#00c896",
//           color: "#000",
//           padding: "12px 28px",
//           borderRadius: "10px",
//           fontWeight: "600",
//           fontSize: "14px",
//           textDecoration: "none",
//           display: "inline-block"
//         }}>
//           Explore All AI Features →
//         </Link>
//       </div>

//     </div>
//     </section>
    
//       </div>
//   );
// }


// // // app/layout.jsx
// // import EmergencyButton from "@/components/EmergencyButton";

// // export default function RootLayout({ children }) {
// //   return (
// //     <html>
// //       <body>
// //         {children}
// //         <EmergencyButton userId={session?.user?.id} />
// //       </body>
// //     </html>
// //   );
// // }


// // import Link from "next/link";

// // Add this section inside your homepage JSX
// // Place it after your hero section or "How It Works" section

// "use client";
// import { useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, Stethoscope } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { creditBenefits, features, testimonials } from "@/lib/data";

// export default function Home() {

//   useEffect(() => {
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission();
//     }
//   }, []);

//   return (
//     <div className="bg-background">

//       {/* Hero Section */}
//       <section className="relative overflow-hidden py-32">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <Badge
//                 variant="outline"
//                 className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium"
//               >
//                 Healthcare made simple
//               </Badge>

//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
//                 Connect with doctors <br />
//                 <span className="gradient-title">anytime, anywhere</span>
//               </h1>

//               <p className="text-muted-foreground text-lg md:text-xl max-w-md">
//                 Book appointments, consult via video, and manage your healthcare
//                 journey all in one secure platform.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button
//                   asChild
//                   size="lg"
//                   className="bg-emerald-600 text-white hover:bg-emerald-700"
//                 >
//                   <Link href="/onboarding">
//                     Get Started <ArrowRight className="ml-2 h-4 w-4" />
//                   </Link>
//                 </Button>

//                 <Button
//                   asChild
//                   variant="outline"
//                   size="lg"
//                   className="border-emerald-700/30 hover:bg-muted/80"
//                 >
//                   <Link href="/doctors">Find Doctors</Link>
//                 </Button>
//               </div>
//             </div>

//             <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
//               <Image
//                 src="/banner2.png"
//                 alt="Doctor consultation"
//                 fill
//                 priority
//                 className="object-cover md:pt-14 rounded-xl"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               How It Works
//             </h2>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Our platform makes healthcare accessible with just a few clicks
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <Card
//                 key={index}
//                 className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all"
//               >
//                 <CardHeader className="pb-2">
//                   <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
//                     {feature.icon}
//                   </div>
//                   <CardTitle className="text-xl font-semibold text-white">
//                     {feature.title}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Credit System Section */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <Card className="bg-muted/20 border-emerald-900/30 max-w-4xl mx-auto">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-white flex items-center">
//                 <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
//                 How Our Credit System Works
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ul className="space-y-3">
//                 {creditBenefits.map((benefit, index) => (
//                   <li key={index} className="flex items-start">
//                     <p
//                       className="text-muted-foreground"
//                       dangerouslySetInnerHTML={{ __html: benefit }}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {testimonials.map((t, i) => (
//               <Card key={i} className="border-emerald-900/20">
//                 <CardContent className="pt-6">
//                   <h4 className="font-semibold text-white">{t.name}</h4>
//                   <p className="text-sm text-muted-foreground">{t.role}</p>
//                   <p className="mt-3 text-muted-foreground">
//                     &quot;{t.quote}&quot;
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── AI Features Section ───────────────────────────── */}
//       <section style={{ backgroundColor: "#0a0a0a", padding: "60px 20px" }}>
//         <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

//           <div style={{ textAlign: "center", marginBottom: "40px" }}>
//             <span style={{
//               backgroundColor: "#00c89622",
//               color: "#00c896",
//               fontSize: "12px",
//               fontWeight: "600",
//               padding: "4px 12px",
//               borderRadius: "999px",
//               display: "inline-block",
//               marginBottom: "12px",
//             }}>
//               AI-Powered
//             </span>
//             <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: "700", margin: "0 0 8px" }}>
//               Smart Health Features
//             </h2>
//             <p style={{ color: "#777", fontSize: "15px" }}>
//               Advanced AI tools to help you understand your health better
//             </p>
//           </div>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>

//             <AICard
//               href="/symptom-checker"
//               icon="🧠"
//               badge="Powered by ML"
//               title="AI Symptom Checker"
//               description="Select your symptoms and get AI-powered disease predictions with department recommendations."
//               cta="Try it →"
//             />

//             <AICard
//               href="/ocr"
//               icon="📄"
//               badge="OCR + AI"
//               title="Medical Report Scanner"
//               description="Upload a photo of your prescription or report. We extract text and detect medicines automatically."
//               cta="Scan now →"
//             />

//             <AICard
//               href="/dashboard"
//               icon="📊"
//               badge="Analytics"
//               title="Health Dashboard"
//               description="Track weight, blood pressure, and sugar levels over time with interactive graphs."
//               cta="View dashboard →"
//             />

//           </div>

//           <div style={{ textAlign: "center", marginTop: "32px" }}>
//             <Link href="/ai-features" style={{
//               backgroundColor: "#00c896",
//               color: "#000",
//               padding: "12px 28px",
//               borderRadius: "10px",
//               fontWeight: "600",
//               fontSize: "14px",
//               textDecoration: "none",
//               display: "inline-block",
//             }}>
//               Explore All AI Features →
//             </Link>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// }

// // ── Reusable AI Feature Card ──────────────────────────────
// function AICard({ href, icon, badge, title, description, cta }) {
//   return (
//     <Link href={href} style={{ textDecoration: "none" }}>
//       <div
//         style={{
//           backgroundColor: "#111",
//           border: "1px solid #1f1f1f",
//           borderRadius: "16px",
//           padding: "28px",
//           cursor: "pointer",
//           transition: "border-color 0.2s, background-color 0.2s",
//           height: "100%",
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.borderColor = "#00c89655";
//           e.currentTarget.style.backgroundColor = "#001a12";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.borderColor = "#1f1f1f";
//           e.currentTarget.style.backgroundColor = "#111";
//         }}
//       >
//         <div style={{ fontSize: "32px", marginBottom: "16px" }}>{icon}</div>
//         <span style={{
//           backgroundColor: "#00c89622",
//           color: "#00c896",
//           fontSize: "11px",
//           fontWeight: "600",
//           padding: "2px 10px",
//           borderRadius: "999px",
//           display: "inline-block",
//           marginBottom: "12px",
//         }}>
//           {badge}
//         </span>
//         <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
//           {title}
//         </h3>
//         <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px" }}>
//           {description}
//         </p>
//         <span style={{ color: "#00c896", fontSize: "13px", fontWeight: "600" }}>
//           {cta}
//         </span>
//       </div>
//     </Link>
//   );
// }


"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { creditBenefits, features, testimonials } from "@/lib/data";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium"
              >
                Healthcare made simple
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with doctors <br />
                <span className="gradient-title">anytime, anywhere</span>
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Book appointments, consult via video, and manage your healthcare
                journey all in one secure platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Link href="/onboarding">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-emerald-700/30 hover:bg-muted/80"
                >
                  <Link href="/doctors">Find Doctors</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/banner2.png"
                alt="Doctor consultation"
                fill
                priority
                className="object-cover md:pt-14 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes healthcare accessible with just a few clicks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all"
              >
                <CardHeader className="pb-2">
                  <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credit System Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-muted/20 border-emerald-900/30 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />
                How Our Credit System Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {creditBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <p
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: benefit }}
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-emerald-900/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <p className="mt-3 text-muted-foreground">
                    &quot;{t.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section style={{ backgroundColor: "#0a0a0a", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{
              backgroundColor: "#00c89622",
              color: "#00c896",
              fontSize: "12px",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "999px",
              display: "inline-block",
              marginBottom: "12px",
            }}>
              AI-Powered
            </span>
            <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: "700", margin: "0 0 8px" }}>
              Smart Health Features
            </h2>
            <p style={{ color: "#777", fontSize: "15px" }}>
              Advanced AI tools to help you understand your health better
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            <AICard
              href="/symptom-checker"
              icon="🧠"
              badge="Powered by ML"
              title="AI Symptom Checker"
              description="Select your symptoms and get AI-powered disease predictions with department recommendations."
              cta="Try it →"
            />
            <AICard
              href="/ocr"
              icon="📄"
              badge="OCR + AI"
              title="Medical Report Scanner"
              description="Upload a photo of your prescription or report. We extract text and detect medicines automatically."
              cta="Scan now →"
            />
            <AICard
              href="/dashboard"
              icon="📊"
              badge="Analytics"
              title="Health Dashboard"
              description="Track weight, blood pressure, and sugar levels over time with interactive graphs."
              cta="View dashboard →"
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/ai-features" style={{
              backgroundColor: "#00c896",
              color: "#000",
              padding: "12px 28px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-block",
            }}>
              Explore All AI Features →
            </Link>
          </div>

        </div>
      </section>

      {/* Mental Health Chatbot — floats over the entire page */}
      <ChatWidget />

    </div>
  );
}

function AICard({ href, icon, badge, title, description, cta }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "#111",
          border: "1px solid #1f1f1f",
          borderRadius: "16px",
          padding: "28px",
          cursor: "pointer",
          transition: "border-color 0.2s, background-color 0.2s",
          height: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#00c89655";
          e.currentTarget.style.backgroundColor = "#001a12";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#1f1f1f";
          e.currentTarget.style.backgroundColor = "#111";
        }}
      >
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>{icon}</div>
        <span style={{
          backgroundColor: "#00c89622",
          color: "#00c896",
          fontSize: "11px",
          fontWeight: "600",
          padding: "2px 10px",
          borderRadius: "999px",
          display: "inline-block",
          marginBottom: "12px",
        }}>
          {badge}
        </span>
        <h3 style={{ color: "#fff", fontSize: "16px", fontWeight: "600", margin: "0 0 8px" }}>
          {title}
        </h3>
        <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.6", margin: "0 0 16px" }}>
          {description}
        </p>
        <span style={{ color: "#00c896", fontSize: "13px", fontWeight: "600" }}>
          {cta}
        </span>
      </div>
    </Link>
  );
}
