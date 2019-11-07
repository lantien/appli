import StripeKey from '../config/stripe.config';

module.exports = async (card) => {

    const date = card.values.expiry.split('/');
    const auth = 'Basic cGtfdGVzdF92MXJRNTYwQ1FLUjlVWVBkSllHa3Q2ZmY='

    const res = await fetch("https://api.stripe.com/v1/tokens", {
        body: `card[number]=${card.values.number}&card[exp_month]=${date[0]}&card[exp_year]=${date[1]}&card[cvc]=${card.values.cvc}`,
        headers: {
            Authorization: auth,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    });

    return await res.json();
}