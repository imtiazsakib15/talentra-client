import Image from "next/image";
import logo from "@/assets/talentra-logo.png";

export default function Logo() {
  return <Image src={logo} alt="Logo" width={200} height={45} />;
}
