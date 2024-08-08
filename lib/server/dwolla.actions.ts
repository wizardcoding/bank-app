import { Client } from 'dwolla-v2';

const getEnvironment = (): "production" | "sandbox" => {
    const environment = process.env.DWOLLA_ENV as string;

    switch(environment) {
        case "sandbox":
            return "sandbox";
        case "production":
            return "production";
        default:
            throw new Error("Dwolla environment should be set to production or sandbox");
    }
}