"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { createTransfer } from "@/lib/server/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBanks } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const PaymentTransferForm = (props: PaymentTransferFormProps) => {
    const { accounts } = props;
  return (
    <Form>

    </Form>
  );
}

export default PaymentTransferForm