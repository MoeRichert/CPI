
<!DOCTYPE html>
<html>

<head>
    <meta charset=utf-8 />
    <title>Broken - City CPI Over Time</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style-wide.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet">
    
    <link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
    
    <link rel="stylesheet" href="css/leaflet.css">
		<link rel="stylesheet" href="css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="js/jquery.min.js"></script>
        <script src="js/jquery.dropotron.min.js"></script>
        <script src="js/skel.min.js"></script>
		<script src="js/skel-layers.min.js"></script>
		<script src="js/init.js"></script>
        <script src="js/bootstrap/bootstrap.bundle.min.js"></script>
        <script src="js/jquery.min.js"></script>
		
		<!--stylesheets-->


    
    <style>
        body {
            margin: 0;
            padding: 0;
            background: "whitesmoke";
            font-family: "Noto Sans", sans-serif;
            color: #3d3d3d;
        }
        h3 {
            font-family: "Noto Sans", sans-serif;
            font-size: 1em;
            font-weight: normal;
            text-align: center;
            margin: 0;
        }

        #map {
	       height: 450px;
	       margin: 15px auto;
        }

        #side-panel {
            position: absolute;
            bottom: 0;
            left: 15px;
            width: 280px;
            margin: 20px auto;
            padding: 0 15px;
            background: rgba(256, 256, 256, .8);
            border: 1px solid grey;
            border-radius: 3px;
            z-index: 800;
        }

        p {
            font-size: .9em;
            line-height: 1.5em;
        }

        a {
            color: #005daa;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
        #legend {
            position: relative;
            margin: 20px 0;
        }
        #legend-large, #legend-small {
            border: 2px solid grey;
            border-radius: 50%;
            background: whitesmoke;
            position: absolute;
        }
        #legend-large-label, #legend-small-label {
            position: absolute;
        }
        #legend hr.small, #legend hr.large {
            width: 83px;
            position: absolute;
            top: -8px;
            left: 66px;
        }
        .range-slider {
                width: 50%;
            }
            
            #forward {
                float: right;
            }
            
            #reverse {
                float: left;
            }

    </style>
</head>

<body>
    
    

<nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="index.html"><img src=img/MRP.jpg></a>
                </div>
                <div class="btn-group">
                <div class="btn-group">
                <button class="btn-sm" href="index.html" type="button">
                    
                    Home
                    </button>
                </div>
                <div class="btn-group">
                <button class="btn-sm" href="About.html" type="button">
                    
                    About
                    </button>
                </div>
                

            </div>
            </div>
                
</nav>

<h1>What is the Consumer Price Index?</h1>

<p>The consumer price index (CPI) is a statistic that tracks the changes in price of common consumer goods and services over time. 
</p>
<p>The CPI is constructed by taking a representative sample items and services whose prices are collected periodically. Sub-indices representing specific categories of goods (i.e. consumer electronics, food, housing, ect.) are computed, weighted as part of the index total, and then combined to produce the overall index 
</p>
<p>The annual percentage change in a CPI is used as a measure of inflation. As such, CPI is one metric that can be used to adjust for the effects of inflation, calculate the buying power of wages, develop pensions, regulate prices of goods and services, or to normalize monetary magnitudes to show changes in value across different areas such as countries.
</p>

<p><a href="index.html">Return to the Map</a></p>