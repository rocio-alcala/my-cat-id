"use client";

import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { Stack, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BiHomeAlt, BiMessageAltAdd, BiSolidCat } from "react-icons/bi";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "My cat id",
  description: "The app for your cat info inline",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

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
              <Link href="/">
                <Button variant="text" color={"primary"}>
                  <BiHomeAlt size={20} />
                   Home
                </Button>
              </Link>
              <Link href="/add-cat">
                <Button variant="text">
                  <BiMessageAltAdd size={20} />
                   Add cat
                </Button>
              </Link>
              <Link href="/my-cats">
                <Button variant="text">
                  <BiSolidCat size={20} />
                   My cats
                </Button>
              </Link>
            </Stack>
          </ThemeProvider>
        </nav>
        <main>{children}</main>
        <footer>
          <p className="copyright">Copyright @roalcala 2023</p>
          <ThemeProvider theme={theme}>
            <div className="socials">
              <a href="https://www.instagram.com/">
                <InstagramIcon color={"primary"} />
              </a>
              <a href="https://www.facebook.com/">
                <FacebookIcon color={"primary"} />
              </a>
            </div>
          </ThemeProvider>
        </footer>
      </body>
    </html>
  );
}
