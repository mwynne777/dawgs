import { PlayerStatsResponse } from "./player-stats-service";

export const getPlayerNameFromBadPerformance_2021 = (name: string, performance: PlayerStatsResponse['performances'][`performance_${number}`]) => {
    if(typeof name === 'string') {
        return name;
    }
    switch(performance['id']) {
        case '11841028':
        case '11832468':
        case '11830126':
        case '11821568':
        case '11815729':
        case '11811357':
        case '11808215':
        case '11804905':
        case '11802293':
        case '11800361':
        case '11797739':
        case '11794313':
        case '11793708':
            return 'Mike James'; // Nets
            
        case '11840529':
            return 'Elijah Bryant';
            
        case '11832491':
        case '11828212':
        case '11825937':
        case '11821754':
        case '11817914':
        case '11813355':
        case '11811204':
            return 'Sindarius Thornwell';
            
        case '11832937':
        case '11826051':
        case '11820075':
        case '11810093':
        case '11808262':
        case '11805256':
        case '11802644':
        case '11799584':
        case '11796222':
        case '11794778':
        case '11793717':
        case '11793718':
        case '11793964':
        case '11779930':
        case '11779993':
        case '11775665':
        case '11772541':
        case '11770916':
        case '11767530':
        case '11767973':
        case '11768198':
        case '11768601':
        case '11769305':
        case '11757340':
        case '11768435': // Raptors
        case '11757452':
        case '11768518':
        case '11768522':
        case '11768702':
        case '11757474':
        case '11757543':
        case '11768884':
        case '11757735':
            return 'Terence Davis'; // Kings
            
        case '11832957':
        case '11837658':
        case '11818251':
        case '11815619':
        case '11811715':
        case '11820120':
        case '11805199':
        case '11803740':
        case '11800645':
            return 'Gabriel Deck'; // Thunder
            
        case '11833014':
        case '11767944':
        case '11768143':
        case '11771480':
        case '11769356':
        case '11768440':
        case '11769396':
        case '11759425':
        case '11768516':
        case '11759466':
        case '11759469':
        case '11769502':
        case '11761892':
            return 'Justin Jackson'; // Thunder
            
        case '11834495':
        case '11825991':
        case '11823996':
        case '11820029':
        case '11815637':
        case '11810216':
        case '11807391':
        case '11805284':
        case '11802339':
        case '11799413':
        case '11795647':
        case '11793711':
        case '11793716':
        case '11793719':
        case '11782221':
        case '11780524':
        case '11780741':
        case '11775664':
        case '11773473':
        case '11771747':
        case '11770160':
        case '11769655':
        case '11769657':
        case '11769663':
        case '11771482':
            return 'Rudy Gay'; // Spurs
            
        case '11828318':
            return 'Freddie Gillespie';
            
        case '11908776':
            return 'John Konchar';
            
        case '11826008':
        case '11821422':
        case '11820066':
        case '11808587':
        case '11805618': 
        case '11803938': 
        case '11800581': 
        case '11795610': 
        case '11793617': 
        case '11793712': 
        case '11793725': 
        case '11780339': 
        case '11782321': 
        case '11775831': 
        case '11774276': // Magic 
            return 'Khem Birch'; // Raptors
            
        case '11824075':
        case '11817917':
        case '11814285':
        case '11814488':
        case '11814512':
            return 'Eric Bledsoe';
            
        case '11820194':
        case '11815660':
        case '11813324':
        case '11810083':
        case '11805179':
        case '11803652':
        case '11800496':
        case '11793626':
        case '11793709':
        case '11793715':
        case '11793720':
        case '11780433':
        case '11772215':
            return 'DaQuan Jeffries'; // Rockets
            
        case '11808389':
        case '11807217':
        case '11795791':
        case '11793710':
        case '11793721':
        case '11777380':
            return 'James Nunnally'; // Pelicans

        case '11773525':
        case '11772363':
        case '11770687':
        case '11767474':
        case '11767621': 
        case '11767992': 
        case '11768354': 
        case '11757932':
        case '11756121':
        case '11754682':
        case '11753099': // Trail Blazers
        case '11752592':
        case '11747333':
        case '11746811':
        case '11746288':
        case '11768665':
        case '11745263':
        case '11744762':
        case '11744363':
        case '11744016':
        case '11743525':
        case '11742802':
        case '11740974':
        case '11740504':
        case '11740126':
        case '11739517':
        case '11738992':
        case '11738467':
        case '11738082':
        case '11737717':
        case '11737217':
        case '11735883':
        case '11735229':
        case '11734629':
        case '11734149':
        case '11733570':
        case '11732991':
        case '11732456':
        case '11732131':
        case '11727382':
        case '11727047':
        case '11726531':
        case '11726292':
        case '11725859':
        case '11725361':
        case '11724699':
        case '11724233':
        case '11723689':
        case '11722407':
        case '11722271':
        case '11721638':
            return 'Gary Trent Jr.';
            
        default:
            return `${performance['id']}: ${performance['game']['description']}, ${performance['game']['gameday']}, ${performance['team']['code']}, ${performance['statline']}`;
    }
}