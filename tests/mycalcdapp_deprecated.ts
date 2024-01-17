// Modified version based from the tutorial
import assert from "assert";
import { Mycalcdapp } from "../target/types/mycalcdapp";

import * as anchor from "@project-serum/anchor";
import { AnchorProvider, web3 } from '@project-serum/anchor';
const { SystemProgram } = web3;

describe("Mycalcdapp using deprecated method of anchor 0.21.0", () => {
  // Configure the client to use the local cluster.
  const provider = AnchorProvider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();

  const program = anchor.workspace.Mycalcdapp as anchor.Program<Mycalcdapp>;

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === "Welcome to Solana");
  });
});