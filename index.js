const hideLoading = () => {
    const element = document.getElementById('loading');
    element.className = 'hidden';
};

const showQuote = () => {
    const element = document.getElementById('quote-url');
    element.className = '';
};

const getApiResource = () => {
    const APIs = [
        {
            endpoint: "https://animechan.vercel.app/api/random",
            getBody: (res_json) => {
                return {
                    text: res_json.quote,
                    author: `${res_json.anime} - ${res_json.character}`,
                    url: "https://animechan.vercel.app/api/random",
                };
            },
        },
        {
            endpoint: "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
            getBody: (res_json) => {
                return {
                    text: res_json.quoteText,
                    author: res_json.quoteAuthor,
                    url: res_json.quoteLink,
                };
            },
        },
        {
            endpoint: "https://inspiration.goprogram.ai",
            getBody: (res_json) => {
                return {
                    text: res_json.quote,
                    author: res_json.author,
                    url: "https://inspiration.goprogram.ai",
                };
            },
        },
        {
            endpoint: "https://api.quotable.io/random",
            getBody: (res_json) => {
                return {
                    text: res_json.content,
                    author: res_json.author,
                    url: "https://api.quotable.io/random",
                };
            },
        },
        {
            endpoint: "https://movie-quote-api.herokuapp.com/v1/quote/",
            getBody: (res_json) => {
                return {
                    text: res_json.quote,
                    author: `${res_json.show} - ${res_json.role}`,
                    url: "https://movie-quote-api.herokuapp.com/v1/quote/",
                };
            },
        },
        {
            endpoint: "https://api.themotivate365.com/stoic-quote",
            getBody: (res_json) => {
                return {
                    text: res_json.data.quote,
                    author: res_json.data.author,
                    url: "https://api.themotivate365.com/stoic-quote",
                };
            },
        },
        {
            endpoint: "https://favqs.com/api/qotd",
            getBody: (res_json) => {
                return {
                    text: res_json.quote.body,
                    author: res_json.quote.author,
                    url: res_json.quote.url,
                };
            },
        },
    ];
    const randomApiIndex = Math.floor(Math.random() * APIs.length);
    return APIs[randomApiIndex];
};

async function fetchQuote() {
    /*
        const quotes = [
        {
            "text": "Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_118352"
        },
        {
            "text": "Health is the greatest possession. Contentment is the greatest treasure. Confidence is the greatest friend. Non-being is the greatest joy.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_117856"
        },
        {
            "text": "Truthful words are not beautiful; beautiful words are not truthful. Good words are not persuasive; persuasive words are not good.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_390341"
        },
        {
            "text": "The journey of a thousand miles begins with one step.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_137141"
        },
        {
            "text": "A good traveler has no fixed plans, and is not intent on arriving.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_108135"
        },
        {
            "text": "Life and death are one thread, the same line viewed from different sides.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_163064"
        },
        {
            "text": "He who knows that enough is enough will always have enough.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_100247"
        },
        {
            "text": "When I let go of what I am, I become what I might be.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_379182"
        },
        {
            "text": "An ant on the move does more than a dozing ox.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_120030"
        },
        {
            "text": "Great acts are made up of small deeds.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_137137"
        },
        {
            "text": "He who talks more is sooner exhausted.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_380273"
        },
        {
            "text": "If you realize that all things change, there is nothing you will try to hold on to. If you are not afraid of dying, there is nothing you cannot achieve.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_164556"
        },
        {
            "text": "Fill your bowl to the brim and it will spill. Keep sharpening your knife and it will blunt.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_132774"
        },
        {
            "text": "To the mind that is still, the whole universe surrenders.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_133381"
        },
        {
            "text": "The words of truth are always paradoxical.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_133875"
        },
        {
            "text": "Silence is a source of great strength.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_130682"
        },
        {
            "text": "Everything has beauty, but not everyone sees it.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_104254"
        },
        {
            "text": "Our greatest glory is not in never falling, but in rising every time we fall.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_101164"
        },
        {
            "text": "I hear, I know. I see, I remember. I do, I understand.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_108960"
        },
        {
            "text": "To know what you know and what you do not know, that is true knowledge.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_141560"
        },
        {
            "text": "Ability will never catch up with the demand for it.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_119276"
        },
        {
            "text": "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
            "author": "Aristotle",
            "url": "https://www.brainyquote.com/quotes/aristotle_100584"
        },
        {
            "text": "Well begun is half done.",
            "author": "Aristotle",
            "url": "https://www.brainyquote.com/quotes/aristotle_109750"
        },
        {
            "text": "The secret to humor is surprise.",
            "author": "Aristotle",
            "url": "https://www.brainyquote.com/quotes/aristotle_133094"
        },
        {
            "text": "Look up at the stars and not down at your feet. Try to make sense of what you see, and wonder about what makes the universe exist. Be curious.",
            "author": "Stephen Hawking",
            "url": "https://www.brainyquote.com/quotes/stephen_hawking_627123"
        },
        {
            "text": "It does not matter how slowly you go as long as you do not stop.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_140908"
        },
        {
            "text": "Be kind whenever possible. It is always possible.",
            "author": "Dalai Lama",
            "url": "https://www.brainyquote.com/quotes/dalai_lama_378036"
        },
        {
            "text": "It always seems impossible until it's done.",
            "author": "Nelson Mandela",
            "url": "https://www.brainyquote.com/quotes/nelson_mandela_378967"
        },
        {
            "text": "Quality is not an act, it is a habit.",
            "author": "Aristotle",
            "url": "https://www.brainyquote.com/quotes/aristotle_379604"
        },
        {
            "text": "Life is really simple, but we insist on making it complicated.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_104563"
        },
        {
            "text": "He who has a why to live can bear almost any how.",
            "author": "Friedrich Nietzsche",
            "url": "https://www.brainyquote.com/quotes/friedrich_nietzsche_103819"
        },
        {
            "text": "There is a very fine line between loving life and being greedy for it.",
            "author": "Maya Angelou",
            "url": "https://www.brainyquote.com/quotes/maya_angelou_148646"
        },
        {
            "text": "Love and compassion are necessities, not luxuries. Without them humanity cannot survive.",
            "author": "Dalai Lama",
            "url": "https://www.brainyquote.com/quotes/dalai_lama_121172"
        },
        {
            "text": "Love is of all passions the strongest, for it attacks simultaneously the head, the heart and the senses.",
            "author": "Lao Tzu",
            "url": "https://www.brainyquote.com/quotes/lao_tzu_387058"
        },
        {
            "text": "Think of all the beauty still left around you and be happy.",
            "author": "Anne Frank",
            "url": "https://www.brainyquote.com/quotes/anne_frank_121548"
        },
        {
            "text": "It is time for parents to teach young people early on that in diversity there is beauty and there is strength.",
            "author": "Maya Angelou",
            "url": "https://www.brainyquote.com/quotes/maya_angelou_132707"
        },
        {
            "text": "When it is obvious that the goals cannot be reached, don't adjust the goals, adjust the action steps.",
            "author": "Confucius",
            "url": "https://www.brainyquote.com/quotes/confucius_140548"
        },
        {
            "text": "Wisdom begins in wonder.",
            "author": "Socrates",
            "url": "https://www.brainyquote.com/quotes/socrates_101211"
        },
        {
            "text": "Don't forget to love yourself.",
            "author": "Soren Kierkegaard",
            "url": "https://www.brainyquote.com/quotes/soren_kierkegaard_103446"
        },
        {
            "text": "Life can only be understood backwards; but it must be lived forwards.",
            "author": "Soren Kierkegaard",
            "url": "https://www.brainyquote.com/quotes/soren_kierkegaard_105030"
        },
        {
            "text": "The greatest wealth is to live content with little.",
            "author": "Plato",
            "url": "https://www.brainyquote.com/quotes/plato_110191"
        },
        {
            "text": "Man is the only creature that refuses to be what he is.",
            "author": "Albert Camus",
            "url": "https://www.brainyquote.com/quotes/albert_camus_101262"
        },
        {
            "text": "When the rich wage war, it's the poor who die.",
            "author": "Jean-Paul Sartre",
            "url": "https://www.brainyquote.com/quotes/jeanpaul_sartre_108422"
        },
        {
            "text": "A lost battle is a battle one thinks one has lost.",
            "author": "Jean-Paul Sartre",
            "url": "https://www.brainyquote.com/quotes/jeanpaul_sartre_118088"
        },
        {
            "text": "The world of reality has its limits; the world of imagination is boundless.",
            "author": "Jean-Jacques Rousseau",
            "url": "https://www.brainyquote.com/quotes/jeanjacques_rousseau_121644"
        },
        {
            "text": "No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.",
            "author": "Buddha",
            "url": "https://www.brainyquote.com/quotes/buddha_385920"
        },
        {
            "text": "The foot feels the foot when it feels the ground.",
            "author": "Buddha",
            "url": "https://www.brainyquote.com/quotes/buddha_108245"
        },
        {
            "text": "It is a man's own mind, not his enemy or foe, that lures him to evil ways.",
            "author": "Buddha",
            "url": "https://www.brainyquote.com/quotes/buddha_100949"
        },
        {
            "text": "The universe seems neither benign nor hostile, merely indifferent.",
            "author": "Carl Sagan",
            "url": "https://www.brainyquote.com/quotes/carl_sagan_137410"
        },
        {
            "text": "Judge a man by his questions rather than his answers.",
            "author": "Voltaire",
            "url": "https://www.brainyquote.com/quotes/voltaire_100338"
        }
        ]; 
    */
    // const randomIndex = Math.floor(Math.random() * quotes.length);
    // const quote = quotes[randomIndex];

    const api = getApiResource();
    console.log("api:", api);

    const response = await fetch(api.endpoint, { headers: { "Access-Control-Allow-Origin": "*" } });
    let rsData = await response.json();
    console.log("rsData: ", rsData);
    let quote = api.getBody(rsData);

    console.log(quote);
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const linkElement = document.getElementById('quote-url');
    quoteElement.innerText = quote.text;
    authorElement.innerText = quote.author;
    linkElement.setAttribute('href', quote.url);
    linkElement.setAttribute('title', `By ${quote.author}`);
    hideLoading();
    showQuote();
}

window.addEventListener('load', () => {
    fetchQuote();
});