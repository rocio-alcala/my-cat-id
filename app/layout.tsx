"use client"

import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { Stack, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My cat id",
  description: "Todos los datos de tu gato, en linea",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    }
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <ThemeProvider theme={theme}>
          <Stack direction="row" spacing={2}>
          <Link href="/"><Button variant="text" color={"primary"}>Home</Button></Link>
          <Link href="/add-cat"><Button variant="text">Add cat</Button></Link>
          <Link href="/my-cats"><Button variant="text">My cats</Button></Link></Stack></ThemeProvider>
        </nav>
        <main>{children}</main>
        <footer>Copyright @roalcala 2023</footer>
      </body>
    </html>
  );
}
