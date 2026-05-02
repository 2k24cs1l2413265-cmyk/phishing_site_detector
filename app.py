from flask import Flask, render_template, request
import pickle 
import re

app = Flask(__name__)

vector = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('phishing.pkl', 'rb'))


@app.route('/', methods = ['GET', 'POST'])
def index():
    if request.method == 'POST':
        url = request.form['url']
        # print(url)

        cleaned_url = re.sub(r'https?://(www\.)?','', url)
        




        predict = model.predict(vector.transform([cleaned_url]))[0]
        # print(predict)

        if predict == 'bad':
            predict = "Don't Click , site is not safe"

        elif predict == 'good':
            predict = "Site is safe for your system"
        else :
            predict = "Something is Wrong"




        return render_template("index.html", predict = predict)
        

        
    else:
        return render_template("index.html")



if __name__== "__main__":
    app.run(debug=True) 
