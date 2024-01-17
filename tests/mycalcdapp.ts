import assert from "assert";
import { Mycalcdapp } from "../target/types/mycalcdapp";

/// CHANGES : Anchor, Program, and SystemProgram source now has changed 
/// from @project-serum/anchor to @coral-xyz/anchor
/// Also use the ES Modules way to import instead of CommonJS
/// It will spare you from the VS Code anger
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
const { SystemProgram } = anchor.web3;

describe("MyCalcApp", () => {
  // CHANGES : The class to retrieve provider has been updated 
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();

  // Use Type Assertion to enable TypeScript to do type checking during linting
  const program = anchor.workspace.Mycalcdapp as Program<Mycalcdapp>;

  it("Creates a calculator", async () => {
    // In latest version the creation of the dependencies is using chain method
    await program.methods.create("Welcome to Solana")
      .accounts({
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      })
      .signers([calculator])
      .rpc()

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Add two number", async () => {
    // In latest version the creation of the dependencies is using chain method
    await program.methods.add(new anchor.BN(1), new anchor.BN(2))
      .accounts({ calculator: calculator.publicKey })
      .rpc()

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.result.eq(new anchor.BN(3)));
  });

  it("Substract two number", async () => {
    // In latest version the creation of the dependencies is using chain method
    await program.methods.substract(new anchor.BN(3), new anchor.BN(1))
      .accounts({ calculator: calculator.publicKey })
      .rpc()

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.result.eq(new anchor.BN(2)));
  });

  it("Multiply two number", async () => {
    // In latest version the creation of the dependencies is using chain method
    await program.methods.multiply(new anchor.BN(2), new anchor.BN(2))
      .accounts({ calculator: calculator.publicKey })
      .rpc()

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.result.eq(new anchor.BN(4)));
  });

  it("Divide two number", async () => {
    // In latest version the creation of the dependencies is using chain method
    await program.methods.divide(new anchor.BN(9), new anchor.BN(2))
      .accounts({ calculator: calculator.publicKey })
      .rpc()

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.result.eq(new anchor.BN(4)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
  });
});