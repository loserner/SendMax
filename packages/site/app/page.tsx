"use client";

import "@/styles/mail-login.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";

export default function Login() {
  const { push } = useRouter();
  const { acount, isConnected, connect, switchToTestnetNetwork } = useMetaMaskEthersSigner();

  function formatAccount(): string {
    if (isConnected) return acount?.substring(0, 4) + "..." + acount?.slice(-4);
    return "Connect Wallet";
  }

  async function onConnect(): Promise<void> {
    await switchToTestnetNetwork()
    isConnected ? push("/mail") : await connect();
  }

  return (
    <motion.div className="login">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{
          type: "spring",
          bounce: 3,
          duration: 0.1,
          stiffness: 100,
          velocity: 6,
        }}
      >
        <motion.img src="/login-logo.svg" width={220} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.9 }}
        className="sub"
      >
        Zmail Dapp offers a user-self-hosted decentralized mailbox solution.
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 1 }}
        className="connect mediumSans"
        onClick={onConnect}
      >
        {formatAccount()}
      </motion.button>
    </motion.div>
  );
}
