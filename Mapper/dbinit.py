import pymongo
import requests
from bs4 import BeautifulSoup
from selenium import webdriver


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
#
chrome_driver_dir = './chromedriver'
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('headless')

driver = webdriver.Chrome(chrome_driver_dir, chrome_options=chrome_options)

client = pymongo.MongoClient('localhost', 27017)
db = client.mapEx

db.mapInfo.drop;


def getImg(url):
    print(url)
    driver.get(url)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    target_url = soup.select_one('#mArticle > div.cont_essential > div:nth-child(1) > div.details_present > a > span.bg_present')['style']
    print(target_url)
    return

def getMapInfo(region, page):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
    params = {'query': region, 'page': page}
    headers = {"Authorization": "KakaoAK b86ffa1735a6bdf569f89e3f10a845a6"}

    places = requests.get(url, params=params, headers=headers).json()['documents']
    total = requests.get(url, params=params, headers=headers).json()['meta']["total_count"]
    # print(places)
    for place in places:
        baseurl = place["place_url"],
        print(baseurl[0])
        url = getImg(baseurl[0])
        # doc = {
        #     "id": place["id"],
        #     "name": place["place_name"],
        #     "address": place["road_address_name"],
        #     "url": place["place_url"],
        #     "phone": place["phone"],
        #     "x": place["x"],
        #     "y": place["y"]
        # }
        # db.mapInfo.insert_one(doc)

for i in range(1,11):
    getMapInfo("제주맛집", i)


driver.quit()

