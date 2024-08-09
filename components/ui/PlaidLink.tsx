'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { PlaidLinkOptions, PlaidLinkOnSuccess, usePlaidLink } from "react-plaid-link";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";

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

    const { open, ready } = usePlaidLink(config);

    const getButton = () => {
        if(variant === 'primary') {
            return (
                <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
                    Connect Bank
                </Button>
            );
        } else if(variant === 'ghost') {
            return (
                <Button className="plaidlink-ghost">
                    Connect Bank
                </Button>
            );
        } else {
            return (
                <Button>
                    Connect Bank
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