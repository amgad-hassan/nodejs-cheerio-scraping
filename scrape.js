const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

request('http://4coding.net/d7/sahara/',(error,response,html) =>{
    if(!error && response.statusCode == 200){
       const $ = cheerio.load(html);
      // const SiteHeading = $('.logo');
       //console.log(SiteHeading);
       //console.log(SiteHeading.text());
       //console.log(SiteHeading.html());
       
       //const output = SiteHeading.find('p').text();
       //console.log(output);

       $('.blog-posts').each((i,el)=>{
           const title = $(el)
                         .find('.post-title')
                         .text()
                         .replace(/\s\s+/g, '');


            const link = $(el)
                     .find('a')
                     .attr('href');
                     
             const date = $(el)
                       .find('.date-meta')
                       .text()
                       .replace(/,/, '');   
            // console.log(title,link,date);  
            writeStream.write(`${title}, ${link}, ${date} \n`);
             
             
       });
       console.log('Scraping Done...');


       
    }
});