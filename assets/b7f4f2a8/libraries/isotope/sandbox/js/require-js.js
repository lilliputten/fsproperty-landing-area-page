requirejs.config({paths:{jquery:"../../bower_components/jquery/jquery"}}),requirejs(["require","jquery","../dist/isotope.pkgd.js"],(function(e,r,i){e(["jquery-bridget/jquery.bridget"],(function(){r.bridget("isotope",i),r("#basic").isotope({masonry:{columnWidth:60}})}))}));