'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { PlaidLinkOptions, PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = (props: PlaidLinkProps) => {
    const { user, variant} = props;
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);
    
    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        });
        router.push('/');
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    };

    const ButtonContent = () => (
        <>
            <Image src="/icons/connect-bank.svg" alt="connect bank" width={24} height={24}/>
            <p className="text-[16px] font-semibold text-black-2">
                Connect Bank
            </p>
            <p></p>
        </>
    )

    const { open, ready } = usePlaidLink(config);

    const getButton = () => {
        if(variant === 'primary') {
            return (
                <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
                    <ButtonContent/>
                </Button>
            );
        } else if(variant === 'ghost') {
            return (
                <Button variant="ghost" onClick={() => open()} className="plaidlink-ghost">
                    <ButtonContent/>
                </Button>
            );
        } else {
            return (
                <Button onClick={() => open()} className="plaidlink-default">
                    <ButtonContent/>
                </Button>
            );
        }
    };
  return (
    <>
        { getButton() }
    </>
  )
}

export default PlaidLink