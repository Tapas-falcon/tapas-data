import {ajax}  from './ajax';

export async function getAuthToken() {
    try {
        var data = JSON.stringify({
            "params": {
                "login": "admin@mei-cake.com",
                "password": "admin",
                "db": "TAPAS_BAK"
            }
        });

        let result = await ajax.post("/auth",data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}
