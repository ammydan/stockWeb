## Stockfront
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6. In this project, we use the apis of the test. You should create your own backend apis.
```html
<a href="https://stockbackend.azurewebsites.net/api/search/aapl" target="_blank">autocomplete</a><br>
<a href="https://stockbackend.azurewebsites.net/api/des/aapl" target="_blank"> info about the company</a><br>
<a href="https://stockbackend.azurewebsites.net/api/market/aapl" target="_blank">stock info</a><br>
<a href="https://stockbackend.azurewebsites.net/api/dailydata/aapl" target="_blank">latest day data</a><br>
<a href="https://stockbackend.azurewebsites.net/api/news/aapl" target="_blank">news</a><br>
<a href="https://stockbackend.azurewebsites.net/api/historydata/aapl" target="_blank">history data point</a><br>
```

#### How to set the web application
###### 1. git clone this application
First step, you should download or git clone the project.
```bash
git clone https://github.com/ammydan/stockWeb.git
```

###### 2. set enviroment
This is a Angular application. You need to download Node.js and then download Angular.
```bash
npm install -g @angular/cli
```
```bash
npm install
```
###### 3. start a web application
```bash
ng server
```
Then you can get into open the url.

#### Sample
this is a example web url.
https://stock-front.azurewebsites.net/
###### 1. index.html
![index.html](https://dpassests.oss-cn-shanghai.aliyuncs.com/index.PNG)
![autocomplete](https://dpassests.oss-cn-shanghai.aliyuncs.com/autocomplete.PNG)
###### 2. details.html
![](https://dpassests.oss-cn-shanghai.aliyuncs.com/details_summary.PNG)
![](https://dpassests.oss-cn-shanghai.aliyuncs.com/detaisl_news.PNG)
![](https://dpassests.oss-cn-shanghai.aliyuncs.com/details_chart.PNG)
![](https://dpassests.oss-cn-shanghai.aliyuncs.com/details_buy.PNG)
![](https://dpassests.oss-cn-shanghai.aliyuncs.com/details_buySuccess.PNG)
###### 3. some other pages
![](https://dpassests.oss-cn-shanghai.aliyuncs.com/watchlist.PNG)
![](https://dpassests.oss-cn-shanghai.aliyuncs.com/portfolio.PNG)



