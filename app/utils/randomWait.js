export const randomWait = () => {
    return new Promise((resolve) => {
        let randomVariable = Math.random() * (1 - 5) + 5; // gets a random variable between 1 and 5
        let someParabola = randomVariable ** 1.3 + 0.2; // value passed into the classic parabolic equation so that it's more likely to be less than large
        setTimeout(() => {
            console.log('wait finished');
            resolve(); // resolve the promise after the timeout
        }, someParabola * 1000);
    });
}

export const randomResponseTime = (response) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, response.length * 75)
    })
}