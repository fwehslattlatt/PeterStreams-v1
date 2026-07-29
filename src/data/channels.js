// Basic cable + all sports channels
// famelackUrl: the Famelack embed URL for the channel
// To find a channel on Famelack: https://famelack.com/tv/us - each channel has a direct URL

export const CHANNELS = [
  // --- News ---
  { id: 1, name: "CNN", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/200px-CNN.svg.png", famelackUrl: "https://famelack.com/tv/us/cnn-us" },
  { id: 2, name: "Fox News", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/200px-Fox_News_Channel_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/fox-news-channel" },
  { id: 3, name: "MSNBC", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/MSNBC_logo_%282015%29.svg/200px-MSNBC_logo_%282015%29.svg.png", famelackUrl: "https://famelack.com/tv/us/msnbc" },
  { id: 4, name: "CNBC", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/200px-CNBC_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/cnbc" },
  { id: 5, name: "BBC News", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/200px-BBC_News_2019.svg.png", famelackUrl: "https://famelack.com/tv/us/bbc-news" },
  { id: 6, name: "Bloomberg", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bloomberg_TV_logo.svg/200px-Bloomberg_TV_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/bloomberg-television" },
  { id: 7, name: "C-SPAN", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/C-SPAN.svg/200px-C-SPAN.svg.png", famelackUrl: "https://famelack.com/tv/us/c-span" },
  { id: 8, name: "C-SPAN 2", category: "News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/C-SPAN.svg/200px-C-SPAN.svg.png", famelackUrl: "https://famelack.com/tv/us/c-span-2" },

  // --- Broadcast ---
  { id: 9, name: "ABC", category: "Broadcast", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/ABC_Entertainment_2023.svg/200px-ABC_Entertainment_2023.svg.png", famelackUrl: "https://famelack.com/tv/us/abc-7-los-angeles" },
  { id: 10, name: "NBC", category: "Broadcast", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/200px-NBC_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/nbc-news-now" },
  { id: 11, name: "CBS", category: "Broadcast", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/CBS_logo.svg/200px-CBS_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/cbs-news-24-7" },
  { id: 12, name: "PBS", category: "Broadcast", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/PBS_Logo_3.svg/200px-PBS_Logo_3.svg.png", famelackUrl: "https://famelack.com/tv/us/pbs" },

  // --- Entertainment ---
  { id: 13, name: "AMC", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/AMC_2016_logo.svg/200px-AMC_2016_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/amc" },
  { id: 14, name: "TNT", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/TNT_US_logo_2016.svg/200px-TNT_US_logo_2016.svg.png", famelackUrl: "https://famelack.com/tv/us/tnt" },
  { id: 15, name: "TBS", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/TBS_logo_2016.svg/200px-TBS_logo_2016.svg.png", famelackUrl: "https://famelack.com/tv/us/tbs" },
  { id: 16, name: "USA Network", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/USA_Network_logo_%282016%29.svg/200px-USA_Network_logo_%282016%29.svg.png", famelackUrl: "https://famelack.com/tv/us/usa-network" },
  { id: 17, name: "FX", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/FX_International_channel_logo.svg/200px-FX_International_channel_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/fx" },
  { id: 18, name: "Bravo", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bravo_logo_2017.svg/200px-Bravo_logo_2017.svg.png", famelackUrl: "https://famelack.com/tv/us/bravo" },
  { id: 19, name: "A&E", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/A%26E_Network_logo.svg/200px-A%26E_Network_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/ae" },
  { id: 20, name: "Lifetime", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lifetime_2013_logo.svg/200px-Lifetime_2013_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/lifetime" },
  { id: 21, name: "E! Entertainment", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/E%21_logo_2012.svg/200px-E%21_logo_2012.svg.png", famelackUrl: "https://famelack.com/tv/us/e-entertainment" },
  { id: 22, name: "Syfy", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Syfy_logo_2017.svg/200px-Syfy_logo_2017.svg.png", famelackUrl: "https://famelack.com/tv/us/syfy" },
  { id: 23, name: "truTV", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/TruTV_2014_logo.svg/200px-TruTV_2014_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/trutv" },
  { id: 24, name: "Comedy Central", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Comedy_Central_2018.svg/200px-Comedy_Central_2018.svg.png", famelackUrl: "https://famelack.com/tv/us/comedy-central" },
  { id: 25, name: "Paramount Network", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Paramount_Network_logo_%282018%29.svg/200px-Paramount_Network_logo_%282018%29.svg.png", famelackUrl: "https://famelack.com/tv/us/paramount-network" },
  { id: 26, name: "Freeform", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Freeform_2016_logo.svg/200px-Freeform_2016_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/freeform" },

  // --- Reality / Lifestyle ---
  { id: 27, name: "HGTV", category: "Lifestyle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/HGTV-Logo.svg/200px-HGTV-Logo.svg.png", famelackUrl: "https://famelack.com/tv/us/hgtv" },
  { id: 28, name: "Food Network", category: "Lifestyle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Food_Network_logo_2016.svg/200px-Food_Network_logo_2016.svg.png", famelackUrl: "https://famelack.com/tv/us/food-network" },
  { id: 29, name: "TLC", category: "Lifestyle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/TLC_%28TV_channel%29_2017_logo.svg/200px-TLC_%28TV_channel%29_2017_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/tlc" },
  { id: 30, name: "OWN", category: "Lifestyle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Oprah_Winfrey_Network_logo.svg/200px-Oprah_Winfrey_Network_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/own" },
  { id: 31, name: "Travel Channel", category: "Lifestyle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Travel_Channel_2018_Logo.svg/200px-Travel_Channel_2018_Logo.svg.png", famelackUrl: "https://famelack.com/tv/us/travel-channel" },
  { id: 32, name: "WE tv", category: "Lifestyle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/WE_tv_logo.svg/200px-WE_tv_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/we-tv" },

  // --- Music / Pop ---
  { id: 33, name: "MTV", category: "Music", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/MTV_2021.svg/200px-MTV_2021.svg.png", famelackUrl: "https://famelack.com/tv/us/mtv" },
  { id: 34, name: "VH1", category: "Music", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/VH1_logo.svg/200px-VH1_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/vh1" },
  { id: 35, name: "BET", category: "Music", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BET_logo_2012.svg/200px-BET_logo_2012.svg.png", famelackUrl: "https://famelack.com/tv/us/bet" },
  { id: 36, name: "CMT", category: "Music", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Country_Music_Television_logo_2017.svg/200px-Country_Music_Television_logo_2017.svg.png", famelackUrl: "https://famelack.com/tv/us/cmt" },

  // --- Discovery / Documentary ---
  { id: 37, name: "Discovery", category: "Documentary", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Discovery_Channel_-_Square_logo.svg/200px-Discovery_Channel_-_Square_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/discovery-channel" },
  { id: 38, name: "History Channel", category: "Documentary", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/History_channel_logo_2023.svg/200px-History_channel_logo_2023.svg.png", famelackUrl: "https://famelack.com/tv/us/history" },
  { id: 39, name: "National Geographic", category: "Documentary", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/National_Geographic_logo.svg/200px-National_Geographic_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/national-geographic" },
  { id: 40, name: "Animal Planet", category: "Documentary", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Animal_Planet_Logo_2018.svg/200px-Animal_Planet_Logo_2018.svg.png", famelackUrl: "https://famelack.com/tv/us/animal-planet" },
  { id: 41, name: "Nat Geo Wild", category: "Documentary", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Nat_Geo_Wild_logo.svg/200px-Nat_Geo_Wild_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/nat-geo-wild" },

  // --- Kids ---
  { id: 42, name: "Nickelodeon", category: "Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Nickelodeon_2009_logo_%28outline%29.svg/200px-Nickelodeon_2009_logo_%28outline%29.svg.png", famelackUrl: "https://famelack.com/tv/us/nickelodeon" },
  { id: 43, name: "Cartoon Network", category: "Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/200px-Cartoon_Network_2010_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/cartoon-network" },
  { id: 44, name: "Disney Channel", category: "Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Disney_Channel_2019.svg/200px-Disney_Channel_2019.svg.png", famelackUrl: "https://famelack.com/tv/us/disney-channel" },
  { id: 45, name: "Disney XD", category: "Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Disney_XD_2015_logo.svg/200px-Disney_XD_2015_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/disney-xd" },
  { id: 46, name: "Disney Junior", category: "Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Disney_Junior_logo.svg/200px-Disney_Junior_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/disney-junior" },
  { id: 47, name: "Nick Jr.", category: "Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nick_Jr._2023_logo.svg/200px-Nick_Jr._2023_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/nick-jr" },
  { id: 48, name: "Boomerang", category: "Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Boomerang_2015_logo.svg/200px-Boomerang_2015_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/boomerang" },

  // --- Sports ---
  { id: 49, name: "ESPN", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png", famelackUrl: "https://famelack.com/tv/us/espn" },
  { id: 50, name: "ESPN2", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/ESPN2_logo.svg/200px-ESPN2_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/espn2" },
  { id: 51, name: "ESPN News", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/ESPNEWS_logo.svg/200px-ESPNEWS_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/espnews" },
  { id: 52, name: "ESPN U", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/200px-ESPN_wordmark.svg.png", famelackUrl: "https://famelack.com/tv/us/espnu" },
  { id: 53, name: "Fox Sports 1", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fox_Sports_1_logo.svg/200px-Fox_Sports_1_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/fox-sports-1" },
  { id: 54, name: "Fox Sports 2", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Fox_Sports_2_logo.svg/200px-Fox_Sports_2_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/fox-sports-2" },
  { id: 55, name: "CBS Sports", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/CBS_Sports_Network_%282020%29.svg/200px-CBS_Sports_Network_%282020%29.svg.png", famelackUrl: "https://famelack.com/tv/us/cbs-sports-network" },
  { id: 56, name: "NBC Sports", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/NBCSportsLogo.svg/200px-NBCSportsLogo.svg.png", famelackUrl: "https://famelack.com/tv/us/nbc-sports" },
  { id: 57, name: "Big Ten Network", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Big_Ten_Network_logo.svg/200px-Big_Ten_Network_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/big-ten-network" },
  { id: 58, name: "ACC Network", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/ACC_Network_logo.svg/200px-ACC_Network_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/acc-network" },
  { id: 59, name: "Golf Channel", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Golf_Channel_logo_2021.svg/200px-Golf_Channel_logo_2021.svg.png", famelackUrl: "https://famelack.com/tv/us/golf-channel" },
  { id: 60, name: "NFL Network", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/NFL_Network.svg/200px-NFL_Network.svg.png", famelackUrl: "https://famelack.com/tv/us/nfl-network" },
  { id: 61, name: "NBA TV", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/NBA_TV.svg/200px-NBA_TV.svg.png", famelackUrl: "https://famelack.com/tv/us/nba-tv" },
  { id: 62, name: "MLB Network", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/MLB_Network_logo.svg/200px-MLB_Network_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/mlb-network" },
  { id: 63, name: "NHL Network", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/NHL_Network_logo.svg/200px-NHL_Network_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/nhl-network" },
  { id: 64, name: "Tennis Channel", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tennis_Channel_logo.svg/200px-Tennis_Channel_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/tennis-channel" },
  { id: 65, name: "Olympic Channel", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Olympic_Channel_Logo.svg/200px-Olympic_Channel_Logo.svg.png", famelackUrl: "https://famelack.com/tv/us/olympic-channel" },
  { id: 66, name: "beIN Sports", category: "Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BeIN_Sports_logo_%28New%29.svg/200px-BeIN_Sports_logo_%28New%29.svg.png", famelackUrl: "https://famelack.com/tv/us/bein-sports" },

  // --- Hallmark / Movies ---
  { id: 67, name: "Hallmark", category: "Movies", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Hallmark_Channel_%28US%29_2016_logo.svg/200px-Hallmark_Channel_%28US%29_2016_logo.svg.png", famelackUrl: "https://famelack.com/tv/us/hallmark-channel" },
  { id: 68, name: "BBC America", category: "Entertainment", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/BBC_America.svg/200px-BBC_America.svg.png", famelackUrl: "https://famelack.com/tv/us/bbc-america" },
];

export const CATEGORIES = [...new Set(CHANNELS.map(c => c.category))];