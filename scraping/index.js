import fetch from "node-fetch";
import * as cheerio from "cheerio";

const URLS = {
  leaderboard :'https://www.kingsleague.pro/estadisticas/clasificacion/'
};

async function scrape (url)  {
    const res = await fetch(url);
    const html = await res.text();
    return cheerio.load(html);
};

async function getLeaderBoard () {
    const $ = await scrape(URLS.leaderboard);
    const $rows = $('table tbody tr');
    
    const LEADERBOARD_SELECTOR = {
        team: '.fs-table-text_3',
        victories: '.fs-table-text_4',
        loses: '.fs-table-text_5',
        scoreGoals: '.fs-table-text_6',
        concededGoals: '.fs-table-text_7',
        cardsYellow: '.fs-table-text_8',
        cardsRed: '.fs-table-text_9'
    }

    const cleanText = (text) => text
        .replace(/\t|\n|\s:/g, '')
        .replace(/.*:/g, ' ')
        .trim()
    
    const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTOR);

    $rows.each((index, el) => {
        const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, selector]) => {
            const rawValue = $(el).find(selector).text();
            const value = cleanText(rawValue);
            return [ key, value ];
        });
        console.log(Object.fromEntries(leaderBoardEntries));
    });



    
        
/*
        const rawTeam = $el.find('.fs-table-text_3').text();
        const rawVictories = $el.find('.fs-table-text_4').text();
        const rawLoses = $el.find('.fs-table-text_5').text().trim();
        const rawScoredGoals = $el.find('.fs-table-text_6').text();
        const rawCondedeGoals = $el.find('.fs-table-text_7').text();
        const rawCardsYellow = $el.find('.fs-table-text_8').text();
        const rawCardsRed = $el.find('.fs-table-text_9').text();
        console.log(
            cleanText(rawTeam),
            cleanText(rawVictories),
            cleanText(rawLoses),
            cleanText(rawScoredGoals),
            cleanText(rawCondedeGoals),
            cleanText(rawCardsYellow),
            cleanText(rawCardsRed),
        );*/
    }

await getLeaderBoard()

/*
const leaderboard = [{
    team: 'Team 2',
    victories: 0,
    loses: 0,
    goalsScored: 0,
    goalsConceded: 0,
    cardsYellow: 0,
    cardsRed: 0,
}];
*/
