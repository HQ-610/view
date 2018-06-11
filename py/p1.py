#coding=utf-8
import numpy as np
from scipy.fftpack import fft,ifft
import matplotlib.pyplot as plt
import seaborn
import codecs
import csv


def getPlot(ch1=[], ch2=[], ch3=[], ch4=[]):
    # x=[-2.6767, 10.983, 6.8602, 6.8503, 6.1652, 13.828, 2.7118, 6.473, 10.446, 17.174]
    # x11 = np.linspace(-2, 2, 20)
    # print x
    # print x11,type(x11)
    # x=np.array(x)

    x1=np.array(ch1)
    x2=np.array(ch2)
    x3=np.array(ch3)
    x4=np.array(ch4)

    # y = 7 * np.sin(2 * np.pi * 180 * x) + 2.8 * np.sin(2 * np.pi * 390 * x) + 5.1 * np.sin(2 * np.pi * 600 * x)
    # yy = fft(y)
    # xf = np.arange(len(y))

    y1=7*np.sin(2*np.pi*180*x1) + 2.8*np.sin(2*np.pi*390*x1)+5.1*np.sin(2*np.pi*600*x1)
    yy1=fft(y1)
    xf1 = np.arange(len(y1))

    y2 = 7 * np.sin(2 * np.pi * 180 * x2) + 2.8 * np.sin(2 * np.pi * 390 * x2) + 5.1 * np.sin(2 * np.pi * 600 * x2)
    yy2 = fft(y2)
    xf2 = np.arange(len(y2))

    y3 = 7 * np.sin(2 * np.pi * 180 * x3) + 2.8 * np.sin(2 * np.pi * 390 * x3) + 5.1 * np.sin(2 * np.pi * 600 * x3)
    yy3 = fft(y3)
    xf3 = np.arange(len(y3))

    y4 = 7 * np.sin(2 * np.pi * 180 * x4) + 2.8 * np.sin(2 * np.pi * 390 * x4) + 5.1 * np.sin(2 * np.pi * 600 * x4)
    yy4 = fft(y4)
    xf4 = np.arange(len(y4))


    plt.subplot(221)
    plt.plot(xf1,yy1,'g')
    plt.title('FFT-ch1 ',fontsize=9,color='r')

    plt.subplot(222)
    plt.plot(xf2, yy2, 'g')
    plt.title('FFTch2 ', fontsize=9, color='r')

    plt.subplot(223)
    plt.plot(xf3, yy3, 'g')
    plt.title('FFT-ch3 ', fontsize=9, color='r')

    plt.subplot(224)
    plt.plot(xf4, yy4, 'g')
    plt.title('FFT-ch4', fontsize=9, color='r')

    plt.show()
def  getData():
    ch1=[]
    ch2=[]
    ch3=[]
    ch4=[]
    f1=codecs.open('sample_data.csv','rb',encoding='utf-8')
    csvDict=csv.DictReader(f1)
    for each in csvDict:
        print each
        ch1.append(float(each.get('Ch_1')))
        ch2.append(float(each.get('Ch_2')))
        ch3.append(float(each.get('Ch_3')))
        ch4.append(float(each.get('Ch_4')))
    f1.close()
    return ch1,ch2,ch3,ch4




if __name__=="__main__":
    ch1, ch2, ch3, ch4=getData()
    getPlot(ch1, ch2, ch3, ch4)
    # getPlot()
    # print ch1
