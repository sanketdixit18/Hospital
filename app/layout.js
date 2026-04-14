// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Toaster } from "sonner";
// import Header from "@/components/header";
// import { dark } from "@clerk/themes";
// import { ThemeProvider } from "@/components/theme-provider";



// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Doctors Appointment App",
//   description: "Connect with doctors anytime, anywhere",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider
//       appearance={{
//         baseTheme: dark,
//       }}
//     >
//       <html lang="en" suppressHydrationWarning>
//         <head>
//           <link rel="icon" href="/logo.png" sizes="any" />
//         </head>
//         <body className={`${inter.className}`}>
//           <ThemeProvider
//             attribute="class"
//             defaultTheme="dark"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <Header />
//             <main className="min-h-screen">{children}</main>
//             <Toaster richColors />

//             {/* <footer className="bg-muted/50 py-12">
//               <div className="container mx-auto px-4 text-center text-gray-200">
//                 <p>Made with Sanket Dixit</p>
//               </div>
//             </footer> */}
//              {/* 🔽 ADD THIS LINE */}
            
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


// // app/layout.jsx
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



import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import EmergencyButton from "@/components/EmergencyButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Doctors Appointment App",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen pt-20 ">{children}</main>
            <Toaster richColors />
            <EmergencyButton />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}