/**
 * @description Receives a url and checks if it is a valid localhost string. For example: localhost:7000 will be valid
 * @param url
 */
function islocalhost(url: string): boolean {
    if (!url.includes("localhost:")) {
        return false;
    }

    const splitted = url.split("localhost:");

    const protocol = splitted[0];
    const port = Number(splitted[1]);

    if (protocol !== "https://" && protocol !== "http://" && protocol !== "") {
        return false;
    }

    if (!Number.isInteger(port)) {
        return false;
    }

    // Allowed port range
    if (port < 1000 || port > 9999) {
        return false;
    }

    return true;
}

export default islocalhost;
