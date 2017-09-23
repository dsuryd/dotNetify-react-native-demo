import { AsyncStorage } from "react-native";

class Authentication {
    url = "";

    signIn(username, password) {
        return fetch(this.url, {
            method: 'post',
            mode: 'no-cors',
            body: "username=" + username + "&password=" + password,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        })
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(token => {
            AsyncStorage.setItem("access_token", token.access_token);
        });
    }

    signOut() {
        AsyncStorage.removeItem("access_token");
    }

    getAccessToken() {
        return AsyncStorage.getItem("access_token");
    }
}

export default new Authentication();