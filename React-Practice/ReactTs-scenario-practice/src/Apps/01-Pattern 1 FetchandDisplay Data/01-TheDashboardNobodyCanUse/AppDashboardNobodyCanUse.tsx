import type { JSX } from "react";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  user: string;
  amount: number;
  date: Date;
}

type Status = "loading" | "success" | "error";

function AppDashboardNobodyCanUse(): JSX.Element {
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchingUser = async () => {
      try {
        const res = await fetch("fintech/users");
        if (!res.ok) {
          throw new Error("not fetch user");
        }
        const data: Transaction[] = await res.json();
        setTransaction(data);
        setStatus("success");
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
          setStatus("error")
        }
      }
    };
    fetchingUser();
  }, []);

  if (status === "loading") {
    return <>Data is loading</>;
  } else if (status === "success") {
    return (
      <>
        <h1>DashBoard</h1>
        {transaction.map((transaction: Transaction) => (
          <h3 key ={transaction.id}>
            the use {transaction.user} and his transaction amount
            <span>{transaction.amount} </span>{" "}
          </h3>
        ))}
      </>
    );
  } else return <> {error instanceof Error? error.message: null}</>;
}

export default AppDashboardNobodyCanUse;
