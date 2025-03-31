"use client";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";

export default function Logo() {
  return (
    <ScrollLink
      to="about"
      smooth={true}
      duration={500}
      className="cursor-pointer"
    >
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="Itay Ostraich Logo"
          width={180}
          height={50}
          className="h-10 w-auto"
        />
      </div>
    </ScrollLink>
  );
}