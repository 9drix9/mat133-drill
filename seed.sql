-- INSERT QUESTIONS
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-001', 'graphs-data', 'A bar chart shows the number of students in each major: Business (45), Engineering (38), Arts (22), Science (31). Which type of graph is most appropriate for this data?', '["Histogram","Frequency bar chart","Time-series graph","Scatter plot"]', 'Frequency bar chart', 1, '["The data shows categories (majors) and their counts","Categories are qualitative/categorical data","Bar charts are used for categorical data with gaps between bars","Histograms are for quantitative data with continuous bins"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-002', 'graphs-data', 'A Pareto chart displays customer complaint types. What distinguishes a Pareto chart from a regular bar chart?', '["Bars are arranged alphabetically","Bars are arranged in descending order of frequency","Bars are arranged in ascending order","Bars have no gaps between them"]', 'Bars are arranged in descending order of frequency', 1, '["Pareto charts follow the Pareto principle (80/20 rule)","Categories are ordered from most frequent to least frequent","This helps identify the most important categories","Often includes a cumulative percentage line"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-003', 'graphs-data', 'Which graph would be most appropriate to display how a company''s stock price changed over the past year?', '["Bar chart","Pie chart","Time-series graph","Histogram"]', 'Time-series graph', 1, '["Stock prices change over time","Time is the independent variable on the x-axis","Time-series graphs show trends and patterns over time","The y-axis shows the value being measured (price)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-004', 'graphs-data', 'A histogram shows test scores: 60-70 (5 students), 70-80 (12 students), 80-90 (18 students), 90-100 (8 students). What is the class width?', '["5","10","15","20"]', '10', 1, '["Class width = Upper limit - Lower limit of any class","For the first class: 70 - 60 = 10","All classes have the same width in a histogram","Class width = 10"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-005', 'graphs-data', 'In a boxplot, the box represents what portion of the data?', '["The entire range","The middle 50% (IQR)","The middle 68%","The middle 95%"]', 'The middle 50% (IQR)', 1, '["The box extends from Q1 to Q3","Q1 is the 25th percentile, Q3 is the 75th percentile","The range Q1 to Q3 contains the middle 50% of data","This range is called the Interquartile Range (IQR)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-006', 'graphs-data', 'A boxplot shows: Min=12, Q1=25, Median=35, Q3=48, Max=72, with a point at 85. What does the point at 85 represent?', '["An error in the data","An outlier","The true maximum","A typical value"]', 'An outlier', 2, '["Individual points beyond the whiskers represent outliers","IQR = Q3 - Q1 = 48 - 25 = 23","Upper fence = Q3 + 1.5(IQR) = 48 + 1.5(23) = 82.5","Since 85 > 82.5, it is an outlier"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-007', 'graphs-data', 'What is the main difference between a histogram and a bar chart?', '["Histograms have gaps between bars","Bar charts are for quantitative data","Histograms have no gaps and show quantitative data","Bar charts must be in order"]', 'Histograms have no gaps and show quantitative data', 1, '["Histograms display quantitative (numerical) data","Bars in histograms touch because data is continuous","Bar charts display categorical (qualitative) data","Bars in bar charts have gaps to show distinct categories"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-008', 'graphs-data', 'Looking at a histogram, how can you estimate the median?', '["Find the tallest bar","Find the class that contains the middle observation","Calculate the mean of all bar heights","Find the shortest bar"]', 'Find the class that contains the middle observation', 2, '["Calculate total frequency (n)","The median is at position (n+1)/2","Count frequencies from left until you reach or pass this position","The median falls in that class"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-009', 'graphs-data', 'A time-series graph of monthly sales shows a clear upward pattern with regular peaks in December. What two features are being displayed?', '["Mean and median","Trend and seasonality","Variance and standard deviation","Range and IQR"]', 'Trend and seasonality', 2, '["Trend: The overall long-term direction (upward)","Seasonality: Regular patterns that repeat at fixed intervals","December peaks suggest holiday shopping patterns","Both components are common in business time-series data"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-010', 'graphs-data', 'In a boxplot, the whiskers extend to:', '["The minimum and maximum values always","1.5 × IQR from the quartiles, or to the most extreme non-outlier","The 5th and 95th percentiles","The mean ± 2 standard deviations"]', '1.5 × IQR from the quartiles, or to the most extreme non-outlier', 2, '["Whiskers extend to the fences OR the most extreme data point within the fences","Lower fence = Q1 - 1.5 × IQR","Upper fence = Q3 + 1.5 × IQR","Points beyond fences are marked as individual outliers"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-011', 'graphs-data', 'A histogram of ages at a retirement community would most likely be:', '["Symmetric","Skewed left","Skewed right","Uniform"]', 'Skewed left', 2, '["Retirement communities have a minimum age requirement","Most residents cluster at older ages","Fewer residents at younger ages (just meeting minimum)","The tail extends to the left (younger ages) = skewed left"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-012', 'graphs-data', 'What type of graph should NOT be used to compare values across categories?', '["Bar chart","Pareto chart","Pie chart","All can be used"]', 'All can be used', 1, '["Bar charts compare category values directly","Pareto charts compare values in decreasing order","Pie charts compare parts to the whole","All three work for categorical comparisons, though bar charts are often clearest"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-013', 'graphs-data', 'A histogram has the following frequencies: 3, 8, 15, 22, 18, 10, 4. What is the approximate shape?', '["Skewed left","Skewed right","Symmetric (approximately normal)","Uniform"]', 'Symmetric (approximately normal)', 2, '["Frequencies increase to a peak (22) in the middle","Then decrease roughly symmetrically","Pattern: 3→8→15→22→18→10→4","This bell-shaped pattern suggests symmetric/normal distribution"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-014', 'graphs-data', 'In a boxplot, which value is always shown inside the box?', '["The mean","The median","The mode","The range"]', 'The median', 1, '["The box shows Q1, median (Q2), and Q3","The median is marked by a line inside the box","The mean may or may not be shown (sometimes as a point)","The median divides the box into two parts"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('gd-015', 'graphs-data', 'A frequency polygon is created by connecting the midpoints of the tops of histogram bars. When is this useful?', '["When you have categorical data","When comparing two or more distributions","When data is bimodal","When the sample size is small"]', 'When comparing two or more distributions', 2, '["Frequency polygons are lines connecting class midpoints","Multiple overlapping histograms are hard to read","Frequency polygons allow easy comparison of shapes","The area under the curve still represents total frequency"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-001', 'distribution-shape', 'A distribution has a mean of 45 and a median of 52. What is the likely shape?', '["Symmetric","Skewed left","Skewed right","Cannot determine"]', 'Skewed left', 1, '["When mean < median, the distribution is skewed left","Left skew has a tail extending to lower values","The mean is pulled toward the tail (lower values)","Mean (45) < Median (52) indicates left skew"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-002', 'distribution-shape', 'Income data for a city shows mean = $85,000 and median = $52,000. What shape is this distribution?', '["Symmetric","Skewed left","Skewed right","Uniform"]', 'Skewed right', 1, '["Mean ($85,000) > Median ($52,000)","When mean > median, distribution is skewed right","High income earners pull the mean up","Right skew is common for income data"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-003', 'distribution-shape', 'For a symmetric distribution, which of the following is true?', '["Mean > Median","Mean < Median","Mean ≈ Median","Mean = 0"]', 'Mean ≈ Median', 1, '["In a symmetric distribution, data is balanced","The mean and median are at the center","They are equal or approximately equal","Examples: normal distribution, uniform distribution"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-004', 'distribution-shape', 'A bar chart shows favorite colors: Red (25), Blue (40), Green (18), Yellow (12). Can you determine the shape of this distribution?', '["Skewed left","Skewed right","Symmetric","Cannot determine - data is categorical"]', 'Cannot determine - data is categorical', 2, '["Colors are categorical/qualitative data","Skewness applies only to quantitative data","The order of categories is arbitrary","Shape cannot be determined for categorical data"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-005', 'distribution-shape', 'Test scores on a very easy exam would likely produce what shape distribution?', '["Symmetric","Skewed left","Skewed right","Bimodal"]', 'Skewed left', 2, '["An easy exam means most students score high","Scores cluster near the maximum","Fewer students have low scores","Tail extends to the left = skewed left (negatively skewed)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-006', 'distribution-shape', 'House prices in a neighborhood have mean = $320,000 and median = $285,000. For a potential buyer, which measure better represents a ''typical'' home?', '["Mean, because it includes all values","Median, because the distribution is likely skewed","Both are equally good","Neither is useful"]', 'Median, because the distribution is likely skewed', 2, '["Mean > Median suggests right skew","A few expensive homes pull the mean up","Median is resistant to extreme values","Median ($285,000) better represents a typical home"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-007', 'distribution-shape', 'Which measure of spread is most appropriate for a heavily skewed distribution?', '["Standard deviation","Variance","IQR (Interquartile Range)","Range"]', 'IQR (Interquartile Range)', 2, '["Standard deviation and variance are sensitive to outliers","Range uses only extreme values, easily affected by outliers","IQR uses Q1 and Q3, ignoring extreme values","IQR is resistant/robust for skewed distributions"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-008', 'distribution-shape', 'A histogram shows most data on the right with a long tail extending left. This is:', '["Positively skewed","Negatively skewed","Symmetric","Uniform"]', 'Negatively skewed', 1, '["The tail points to the direction of skew","Tail extending left = left skew = negative skew","The peak is on the right side","Positively skewed = right skew = tail pointing right"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-009', 'distribution-shape', 'For a symmetric distribution, which measures of center and spread are typically reported?', '["Median and IQR","Mean and standard deviation","Mode and range","Median and variance"]', 'Mean and standard deviation', 1, '["Symmetric distributions have no significant outliers","Mean accurately represents the center","Standard deviation describes spread around the mean","These are preferred for symmetric/normal distributions"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-010', 'distribution-shape', 'The ages of cars in a used car lot would likely have what shape?', '["Symmetric","Skewed left","Skewed right","Bimodal"]', 'Skewed right', 2, '["Most used cars are relatively new (1-5 years)","Fewer cars are very old","Age has a lower bound of 0","Tail extends to right (older cars) = right skew"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-011', 'distribution-shape', 'A distribution is described as ''positively skewed.'' What does this mean about the tail?', '["The tail extends to the left","The tail extends to the right","There is no tail","There are two tails of equal length"]', 'The tail extends to the right', 1, '["Positive skew = right skew","The tail points toward positive values","Most data clusters on the left (lower values)","Mean is pulled right of the median"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-012', 'distribution-shape', 'If a distribution is skewed right, in what order are the mean, median, and mode typically found?', '["Mode < Median < Mean","Mean < Median < Mode","Mean = Median = Mode","Mode < Mean < Median"]', 'Mode < Median < Mean', 2, '["In right-skewed distributions, the tail pulls the mean right","Mode is at the peak (leftmost)","Median is between mode and mean","Order: Mode < Median < Mean"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-013', 'distribution-shape', 'Waiting times at a popular restaurant would likely show what distribution shape?', '["Symmetric","Skewed left","Skewed right","Uniform"]', 'Skewed right', 2, '["Minimum wait time is 0 (no wait)","Most waits are short to moderate","Occasional very long waits stretch the tail","Right skew with lower bound at 0"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-014', 'distribution-shape', 'A distribution where mean ≈ median ≈ mode is most likely:', '["Skewed left","Skewed right","Symmetric","Bimodal"]', 'Symmetric', 1, '["When all three measures are equal, the distribution is symmetric","The center of the distribution is clearly defined","Examples include the normal distribution","This is called a unimodal symmetric distribution"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ds-015', 'distribution-shape', 'SAT scores are designed to follow approximately what distribution shape?', '["Skewed left","Skewed right","Symmetric (normal)","Uniform"]', 'Symmetric (normal)', 1, '["SAT scores are designed to be normally distributed","Most scores cluster around the mean (about 1060)","Scores spread symmetrically above and below","The distribution is bell-shaped"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-001', 'frequency-tables', 'A frequency table shows: Class 10-19 has frequency 5, Class 20-29 has frequency 12, Class 30-39 has frequency 8. What is the relative frequency of class 20-29?', '["0.24","0.32","0.48","0.60"]', '0.48', 1, '["Total frequency = 5 + 12 + 8 = 25","Relative frequency = class frequency / total","Relative frequency of 20-29 = 12 / 25","= 0.48"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-002', 'frequency-tables', 'Given classes 0-9, 10-19, 20-29 with frequencies 4, 7, 9, what is the cumulative frequency for class 20-29?', '["9","11","16","20"]', '20', 1, '["Cumulative frequency = sum of all frequencies up to and including that class","For 0-9: 4","For 10-19: 4 + 7 = 11","For 20-29: 4 + 7 + 9 = 20"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-003', 'frequency-tables', 'A frequency table has classes 15-24, 25-34, 35-44. What are the class midpoints?', '["15, 25, 35","19.5, 29.5, 39.5","20, 30, 40","24, 34, 44"]', '19.5, 29.5, 39.5', 1, '["Class midpoint = (lower limit + upper limit) / 2","For 15-24: (15 + 24) / 2 = 19.5","For 25-34: (25 + 34) / 2 = 29.5","For 35-44: (35 + 44) / 2 = 39.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-004', 'frequency-tables', 'Classes are: 100-119, 120-139, 140-159. What is the class width?', '["10","19","20","59"]', '20', 1, '["Class width = difference between consecutive lower limits","120 - 100 = 20","Or: upper boundary - lower boundary = 119.5 - 99.5 = 20","Class width = 20"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-005', 'frequency-tables', 'Calculate the mean from grouped data:
Class 0-10: frequency 3
Class 10-20: frequency 7
Class 20-30: frequency 5', '["13.3","15","16.3","18"]', '16.3', 2, '["Find class midpoints: 5, 15, 25","Multiply midpoint × frequency: 5×3=15, 15×7=105, 25×5=125","Sum of products = 15 + 105 + 125 = 245","Total frequency = 3 + 7 + 5 = 15","Mean = 245 / 15 = 16.33 ≈ 16.3"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-006', 'frequency-tables', 'What is the difference between class limits and class boundaries?', '["They are the same thing","Boundaries have 0.5 added/subtracted to eliminate gaps","Limits are always larger than boundaries","Boundaries only apply to categorical data"]', 'Boundaries have 0.5 added/subtracted to eliminate gaps', 2, '["Class limits: stated values (e.g., 10-19, 20-29)","Class boundaries: eliminate gaps between classes","Lower boundary = lower limit - 0.5","Upper boundary = upper limit + 0.5","For 10-19: boundaries are 9.5-19.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-007', 'frequency-tables', 'A relative frequency table shows: 0.15, 0.25, 0.35, 0.20 for four classes. What should these sum to?', '["0","1","4","Depends on the data"]', '1', 1, '["Relative frequencies represent proportions","They must sum to 1 (or 100% if expressed as percentages)","0.15 + 0.25 + 0.35 + 0.20 = 0.95 (this table has an error)","A valid table: 0.15 + 0.25 + 0.35 + 0.25 = 1.00"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-008', 'frequency-tables', 'Data ranges from 23 to 87. If you want 6 classes, what should the class width be?', '["10","11","12","64"]', '11', 2, '["Range = Maximum - Minimum = 87 - 23 = 64","Class width = Range / Number of classes","Class width = 64 / 6 = 10.67","Round UP to ensure all data fits: 11"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-009', 'frequency-tables', 'In a cumulative frequency table, the last class should have what cumulative frequency?', '["The mode","The median","The total sample size (n)","1"]', 'The total sample size (n)', 1, '["Cumulative frequency adds all frequencies up to each class","The last class includes all data","Its cumulative frequency equals total observations","This equals n, the sample size"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-010', 'frequency-tables', 'A grouped data set has mean calculated from midpoints. Will this be exactly equal to the true mean?', '["Yes, always","No, it''s an approximation","Only if the distribution is symmetric","Only if all frequencies are equal"]', 'No, it''s an approximation', 2, '["Grouped data loses individual values","We assume all values in a class equal the midpoint","This is rarely exactly true","The calculated mean is an estimate of the true mean"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-011', 'frequency-tables', 'A frequency table has 5 classes with cumulative frequencies 8, 23, 45, 58, 65. What is the frequency of the third class?', '["15","22","23","45"]', '22', 2, '["Frequency = Current cumulative - Previous cumulative","Third class cumulative = 45","Second class cumulative = 23","Third class frequency = 45 - 23 = 22"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-012', 'frequency-tables', 'If you have 50 data points and want to use Sturges'' rule for the number of classes, how many classes should you use?', '["5","6","7","8"]', '7', 2, '["Sturges'' rule: k = 1 + 3.322 × log₁₀(n)","k = 1 + 3.322 × log₁₀(50)","k = 1 + 3.322 × 1.699","k = 1 + 5.64 = 6.64 ≈ 7 classes"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-013', 'frequency-tables', 'Convert to cumulative relative frequency: Class A: 0.20, Class B: 0.35, Class C: 0.45. What is Class B''s cumulative relative frequency?', '["0.20","0.35","0.55","1.00"]', '0.55', 2, '["Cumulative relative frequency adds previous relative frequencies","Class A: 0.20","Class B: 0.20 + 0.35 = 0.55","Class C: 0.55 + 0.45 = 1.00"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-014', 'frequency-tables', 'Classes 50-59, 60-69, 70-79 have frequencies 12, 18, 10. In which class does the median fall?', '["50-59","60-69","70-79","Cannot determine"]', '60-69', 2, '["Total n = 12 + 18 + 10 = 40","Median position = (40 + 1) / 2 = 20.5th value","Cumulative frequencies: 12, 30, 40","The 20.5th value is in the second class (positions 13-30)","Median is in class 60-69"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ft-015', 'frequency-tables', 'What is the class midpoint for the class 45-54?', '["45","49.5","50","54"]', '49.5', 1, '["Class midpoint = (lower limit + upper limit) / 2","Midpoint = (45 + 54) / 2","Midpoint = 99 / 2 = 49.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-001', 'quartiles-iqr', 'Data: 12, 15, 18, 22, 25, 28, 32, 35, 40. What is Q2 (the median)?', '["22","25","28","26.5"]', '25', 1, '["n = 9, data is sorted","Q2 (median) = middle value = 5th value","The 5th value is 25","Q2 = 25"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-002', 'quartiles-iqr', 'Given Q1 = 25, Q3 = 45, what is the IQR?', '["10","20","35","70"]', '20', 1, '["IQR = Q3 - Q1","IQR = 45 - 25","IQR = 20"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-003', 'quartiles-iqr', 'Given Q1 = 25, Q3 = 45, IQR = 20, what is the upper fence for outlier detection?', '["55","65","75","85"]', '75', 2, '["Upper fence = Q3 + 1.5 × IQR","Upper fence = 45 + 1.5 × 20","Upper fence = 45 + 30","Upper fence = 75"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-004', 'quartiles-iqr', 'Data: 5, 8, 12, 15, 18, 22, 25, 28, 32, 85. Which value is an outlier?', '["5","32","85","No outliers"]', '85', 2, '["First find Q1, Q3, and IQR","Q1 ≈ 10, Q3 ≈ 26.5, IQR ≈ 16.5","Upper fence = 26.5 + 1.5(16.5) = 51.25","85 > 51.25, so 85 is an outlier"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-005', 'quartiles-iqr', 'A dataset has outliers. Which measures of center and spread should be used?', '["Mean and standard deviation","Median and IQR","Mode and range","Mean and variance"]', 'Median and IQR', 1, '["Outliers affect the mean and standard deviation","Median and IQR are resistant to outliers","They give a better representation of typical values","Use median and IQR for skewed data or data with outliers"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-006', 'quartiles-iqr', 'A boxplot shows Q1=30, Median=45, Q3=55. The upper whisker extends to 80 and there''s a point at 95. Is 95 an outlier?', '["Yes","No","Cannot determine","Only if it''s above 100"]', 'Yes', 2, '["IQR = Q3 - Q1 = 55 - 30 = 25","Upper fence = Q3 + 1.5(IQR) = 55 + 37.5 = 92.5","95 > 92.5","Yes, 95 is an outlier"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-007', 'quartiles-iqr', 'What percentage of data falls between Q1 and Q3?', '["25%","50%","75%","100%"]', '50%', 1, '["Q1 is the 25th percentile","Q3 is the 75th percentile","Between Q1 and Q3: 75% - 25% = 50%","The IQR contains the middle 50% of data"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-008', 'quartiles-iqr', 'Data: 2, 4, 6, 8, 10, 12, 14, 16. What is the minimum value in the five-number summary?', '["0","2","4","6"]', '2', 1, '["The five-number summary is: Min, Q1, Median, Q3, Max","The data is already sorted","The minimum value is the first number","Minimum = 2"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-009', 'quartiles-iqr', 'If a value equals the upper fence exactly, is it an outlier?', '["Yes","No","Depends on the sample size","Depends on the distribution"]', 'No', 2, '["Outliers are values BEYOND the fences","A value must be > upper fence or < lower fence","A value AT the fence is the most extreme non-outlier","So no, it''s not an outlier"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-010', 'quartiles-iqr', 'A symmetric dataset has no outliers. Would mean or median be a better measure of center?', '["Mean","Median","Both are equally good","Neither is appropriate"]', 'Both are equally good', 2, '["For symmetric data, mean ≈ median","Without outliers, both are reliable","Either can be used effectively","Convention often favors mean for symmetric data"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-011', 'quartiles-iqr', 'Q1=20, Q2=30, Q3=50. Is this distribution symmetric or skewed?', '["Symmetric","Skewed left","Skewed right","Cannot determine"]', 'Skewed right', 2, '["Distance from Q1 to Q2 = 30 - 20 = 10","Distance from Q2 to Q3 = 50 - 30 = 20","Q3 is farther from the median than Q1","More spread on the right = skewed right"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-012', 'quartiles-iqr', 'Calculate the lower fence: Q1=45, Q3=72, IQR=27', '["4.5","17.5","27","45"]', '4.5', 2, '["Lower fence = Q1 - 1.5 × IQR","Lower fence = 45 - 1.5 × 27","Lower fence = 45 - 40.5","Lower fence = 4.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-013', 'quartiles-iqr', 'In a boxplot, the left whisker extends to 15, Q1=25, Median=35, Q3=45, right whisker to 60, with a point at 5. What can you conclude?', '["5 is a typical value","5 is the minimum","5 is an outlier","The data is symmetric"]', '5 is an outlier', 2, '["Points beyond whiskers are outliers","The left whisker extends to 15, not 5","5 is plotted as an individual point","Therefore, 5 is an outlier"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-014', 'quartiles-iqr', 'Data: 10, 12, 14, 16, 18, 20, 22, 24, 26. If we add 100 to each value, how does the IQR change?', '["IQR increases by 100","IQR stays the same","IQR doubles","IQR becomes 0"]', 'IQR stays the same', 2, '["Adding a constant shifts all values equally","Q1 increases by 100, Q3 increases by 100","IQR = Q3 - Q1 remains unchanged","Spread measures are not affected by adding constants"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('qi-015', 'quartiles-iqr', 'What is the relationship between the median and Q2?', '["They are the same","Median is always larger","Q2 is always larger","They are unrelated"]', 'They are the same', 1, '["Q2 is the second quartile","Q2 divides the data in half","This is exactly what the median does","Q2 = Median = 50th percentile"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-001', 'normal-distribution', 'Using the empirical rule, approximately what percentage of data falls within 2 standard deviations of the mean in a normal distribution?', '["68%","95%","99.7%","50%"]', '95%', 1, '["The empirical rule (68-95-99.7) applies to normal distributions","Within 1σ: 68%","Within 2σ: 95%","Within 3σ: 99.7%"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-002', 'normal-distribution', 'A dataset has μ = 100 and σ = 15. Calculate the z-score for x = 130.', '["0.5","1","2","3"]', '2', 1, '["z = (x - μ) / σ","z = (130 - 100) / 15","z = 30 / 15","z = 2"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-003', 'normal-distribution', 'A value has a z-score of -2.5. Is this value unusual?', '["Yes, because |z| ≥ 2","No, because z is negative","No, because |z| < 3","Cannot determine"]', 'Yes, because |z| ≥ 2', 2, '["A value is unusual if |z| ≥ 2","|-2.5| = 2.5","2.5 ≥ 2","Yes, the value is unusual"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-004', 'normal-distribution', 'Heights are normally distributed with μ = 68 inches and σ = 3 inches. What range contains approximately 68% of heights?', '["62-74 inches","65-71 inches","59-77 inches","68-71 inches"]', '65-71 inches', 2, '["68% falls within μ ± 1σ","Lower: 68 - 3 = 65","Upper: 68 + 3 = 71","Range: 65 to 71 inches"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-005', 'normal-distribution', 'If μ = 500 and σ = 100, what is the value corresponding to z = -1.5?', '["350","400","450","500"]', '350', 2, '["x = μ + z × σ","x = 500 + (-1.5) × 100","x = 500 - 150","x = 350"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-006', 'normal-distribution', 'In a normal distribution with μ = 50 and σ = 8, approximately what percentage of values fall below 34?', '["2.5%","5%","16%","50%"]', '2.5%', 2, '["z = (34 - 50) / 8 = -2","z = -2 means 2 standard deviations below mean","By empirical rule, 95% is within ±2σ","2.5% falls below -2σ"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-007', 'normal-distribution', 'What does a z-score of 0 indicate?', '["The value is an outlier","The value equals the mean","The value is negative","The distribution is not normal"]', 'The value equals the mean', 1, '["z = (x - μ) / σ","If z = 0, then x - μ = 0","Therefore x = μ","A z-score of 0 means the value equals the mean"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-008', 'normal-distribution', 'Test scores are normally distributed with μ = 75 and σ = 10. What percentage of students scored above 95?', '["2.5%","5%","16%","32%"]', '2.5%', 2, '["z = (95 - 75) / 10 = 2","95 is 2 standard deviations above the mean","By empirical rule, 2.5% is above z = 2","About 2.5% scored above 95"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-009', 'normal-distribution', 'Which statement about the standard normal distribution is TRUE?', '["Mean = 1, SD = 0","Mean = 0, SD = 1","Mean = 0, SD = 0","Mean = 1, SD = 1"]', 'Mean = 0, SD = 1', 1, '["The standard normal distribution is a special normal distribution","Its mean μ = 0","Its standard deviation σ = 1","All normal distributions can be converted to it using z-scores"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-010', 'normal-distribution', 'Data has μ = 200 and σ = 25. Between what values does approximately 99.7% of the data fall?', '["175-225","150-250","125-275","100-300"]', '125-275', 2, '["99.7% falls within μ ± 3σ","Lower: 200 - 3(25) = 200 - 75 = 125","Upper: 200 + 3(25) = 200 + 75 = 275","Range: 125 to 275"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-011', 'normal-distribution', 'Student A scored 85 on a test with μ=80, σ=5. Student B scored 90 on a test with μ=82, σ=4. Who performed better relative to their class?', '["Student A (z = 1.0)","Student B (z = 2.0)","They performed equally","Cannot compare"]', 'Student B (z = 2.0)', 2, '["Student A: z = (85-80)/5 = 1.0","Student B: z = (90-82)/4 = 2.0","Higher z-score = better relative performance","Student B performed better"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-012', 'normal-distribution', 'If a z-score is 3.5, approximately what percentage of values are above this?', '["Less than 0.1%","About 2.5%","About 5%","About 16%"]', 'Less than 0.1%', 2, '["z = 3.5 is far in the right tail","99.7% is within ±3σ","Only 0.3% is beyond ±3σ","About 0.15% (less than 0.1%) is above z = 3.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-013', 'normal-distribution', 'The empirical rule applies to which type of distribution?', '["All distributions","Normal (bell-shaped) distributions","Skewed distributions only","Uniform distributions"]', 'Normal (bell-shaped) distributions', 1, '["The empirical rule (68-95-99.7) is specific to normal distributions","Normal distributions are symmetric and bell-shaped","The rule doesn''t apply to skewed or other distributions","It describes how data spreads in a normal curve"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-014', 'normal-distribution', 'Birth weights are normally distributed with μ = 7.5 lbs and σ = 1.2 lbs. A baby weighing 4.5 lbs has z-score of:', '["-1.5","-2.0","-2.5","-3.0"]', '-2.5', 2, '["z = (x - μ) / σ","z = (4.5 - 7.5) / 1.2","z = -3 / 1.2","z = -2.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('nd-015', 'normal-distribution', 'In a normal distribution, what percentage of data falls between z = -1 and z = 1?', '["50%","68%","95%","99.7%"]', '68%', 1, '["This is the range within ±1 standard deviation","By the empirical rule (68-95-99.7)","68% of data falls within μ ± 1σ","Which corresponds to z = -1 to z = 1"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-001', 'regression-correlation', 'In the equation ŷ = 15 + 2.5x, what is the slope?', '["15","2.5","17.5","-2.5"]', '2.5', 1, '["The equation is in form ŷ = a + bx","a = y-intercept = 15","b = slope = 2.5","The slope is the coefficient of x"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-002', 'regression-correlation', 'Using ŷ = 10 + 3x, predict y when x = 5.', '["15","20","25","30"]', '25', 1, '["Substitute x = 5 into the equation","ŷ = 10 + 3(5)","ŷ = 10 + 15","ŷ = 25"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-003', 'regression-correlation', 'A regression has r² = 0.81. What does this mean?', '["81% of y values are correct","81% of variation in y is explained by x","The correlation is 0.81","81% of data points are on the line"]', '81% of variation in y is explained by x', 2, '["r² is the coefficient of determination","It represents the proportion of variance explained","r² = 0.81 means 81% of variation in y is explained","by the linear relationship with x"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-004', 'regression-correlation', 'Calculate the residual: predicted y = 45, actual y = 52', '["-7","7","97","45"]', '7', 1, '["Residual = Actual - Predicted","Residual = 52 - 45","Residual = 7","Positive residual means we underestimated"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-005', 'regression-correlation', 'A study finds a strong positive correlation between ice cream sales and drowning deaths. Does ice cream cause drowning?', '["Yes, the correlation proves it","No, correlation does not imply causation","Yes, if r > 0.8","Only if the sample size is large"]', 'No, correlation does not imply causation', 2, '["Correlation measures association, not causation","A lurking variable (temperature) affects both","Hot weather increases ice cream sales AND swimming","More swimming leads to more drowning incidents"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-006', 'regression-correlation', 'In a study of height (x) and weight (y), which is the explanatory variable?', '["Height","Weight","Both","Neither"]', 'Height', 1, '["Explanatory variable is the predictor (x)","Response variable is the outcome (y)","We use height to predict weight","Height is the explanatory variable"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-007', 'regression-correlation', 'A correlation coefficient r = -0.85 indicates:', '["Weak positive relationship","Strong positive relationship","Weak negative relationship","Strong negative relationship"]', 'Strong negative relationship', 1, '["The sign indicates direction: negative = inverse relationship","|r| indicates strength: 0.85 is close to 1","|r| > 0.7 is generally considered strong","r = -0.85 is a strong negative relationship"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-008', 'regression-correlation', 'Data ranges from x = 10 to x = 50. Using the regression equation to predict y when x = 75 is called:', '["Interpolation","Extrapolation","Correlation","Residual analysis"]', 'Extrapolation', 2, '["Interpolation: predicting within the data range","Extrapolation: predicting outside the data range","x = 75 is outside the range 10-50","This is extrapolation and may be unreliable"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-009', 'regression-correlation', 'If r = 0.7, what is r²?', '["0.35","0.49","0.70","1.40"]', '0.49', 1, '["r² = r × r","r² = 0.7 × 0.7","r² = 0.49","49% of variation is explained"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-010', 'regression-correlation', 'The slope of a regression line is -2.5. This means:', '["y increases by 2.5 for each unit increase in x","y decreases by 2.5 for each unit increase in x","The y-intercept is -2.5","The correlation is -2.5"]', 'y decreases by 2.5 for each unit increase in x', 1, '["Slope indicates change in y per unit change in x","Negative slope means y decreases as x increases","For each 1-unit increase in x","y decreases by 2.5 units"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-011', 'regression-correlation', 'What is the range of possible values for r?', '["0 to 1","-1 to 1","0 to infinity","-infinity to infinity"]', '-1 to 1', 1, '["r is the correlation coefficient","r = 1 is perfect positive correlation","r = -1 is perfect negative correlation","r must be between -1 and 1"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-012', 'regression-correlation', 'ŷ = 50 - 1.2x. When x = 0, what is ŷ?', '["-1.2","0","48.8","50"]', '50', 1, '["Substitute x = 0","ŷ = 50 - 1.2(0)","ŷ = 50 - 0","ŷ = 50 (the y-intercept)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-013', 'regression-correlation', 'A residual plot shows a clear curved pattern. What does this suggest?', '["The linear model is a good fit","The linear model is not appropriate","There are no outliers","The correlation is exactly 1"]', 'The linear model is not appropriate', 2, '["A good residual plot shows random scatter","Patterns indicate the model doesn''t fit well","A curved pattern suggests a nonlinear relationship","A different model should be considered"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-014', 'regression-correlation', 'If r² = 0.64 for a positive relationship, what is r?', '["-0.8","0.64","0.8","0.32"]', '0.8', 2, '["r = ±√r²","r = ±√0.64","r = ±0.8","Since relationship is positive, r = +0.8"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('rc-015', 'regression-correlation', 'What is a lurking variable?', '["A variable that is measured but not reported","A variable not in the study that affects both x and y","The y-intercept of the regression line","A value with a large residual"]', 'A variable not in the study that affects both x and y', 2, '["A lurking variable is hidden (not measured)","It affects both variables being studied","It can create a false appearance of correlation","Example: Temperature affecting both ice cream and drowning"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-001', 'probability-basics', 'A fair coin is flipped. What is the sample space?', '["{1, 2}","{H, T}","{0, 1, 2}","{Win, Lose, Tie}"]', '{H, T}', 1, '["Sample space = all possible outcomes","A coin has two sides: Heads and Tails","The sample space is {H, T}","Each outcome is equally likely with P = 0.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-002', 'probability-basics', 'Events A and B are mutually exclusive. P(A) = 0.3, P(B) = 0.4. Find P(A or B).', '["0.12","0.3","0.4","0.7"]', '0.7', 1, '["Mutually exclusive means P(A and B) = 0","P(A or B) = P(A) + P(B) - P(A and B)","P(A or B) = 0.3 + 0.4 - 0","P(A or B) = 0.7"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-003', 'probability-basics', 'P(A) = 0.6. What is P(not A)?', '["0.4","0.6","1.0","1.6"]', '0.4', 1, '["Complement rule: P(not A) = 1 - P(A)","P(not A) = 1 - 0.6","P(not A) = 0.4"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-004', 'probability-basics', 'Are the events ''drawing a heart'' and ''drawing a face card'' from a standard deck mutually exclusive?', '["Yes","No","Only if you draw 2 cards","Depends on the deck"]', 'No', 2, '["Mutually exclusive = cannot happen together","Can you draw a card that is both a heart AND a face card?","Yes: Jack, Queen, King of hearts","So they are NOT mutually exclusive"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-005', 'probability-basics', 'A card is drawn from a standard 52-card deck. What is the probability of drawing a spade?', '["1/52","1/13","1/4","1/2"]', '1/4', 1, '["There are 4 suits in a deck","Each suit has 13 cards","Number of spades = 13","P(spade) = 13/52 = 1/4"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-006', 'probability-basics', 'Events A and B are independent. P(A) = 0.5, P(B) = 0.3. Find P(A and B).', '["0.15","0.2","0.5","0.8"]', '0.15', 1, '["For independent events: P(A and B) = P(A) × P(B)","P(A and B) = 0.5 × 0.3","P(A and B) = 0.15"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-007', 'probability-basics', 'What type of probability is ''3 out of 10 students in this class are left-handed, so P(left-handed) = 0.3''?', '["Classical","Empirical","Subjective","Theoretical"]', 'Empirical', 1, '["Empirical probability is based on observed data","We counted actual left-handed students","This is not theoretical (classical) probability","It''s based on real observations = empirical"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-008', 'probability-basics', 'Two dice are rolled. What is the probability of getting a sum of 7?', '["1/12","1/6","7/36","1/7"]', '1/6', 2, '["Total outcomes = 6 × 6 = 36","Combinations that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1)","There are 6 favorable outcomes","P(sum = 7) = 6/36 = 1/6"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-009', 'probability-basics', 'What makes events A and B independent?', '["They cannot occur together","P(A|B) = P(A)","P(A and B) = 0","P(A or B) = 1"]', 'P(A|B) = P(A)', 2, '["Independent means one doesn''t affect the other","P(A given B) equals P(A)","Knowing B occurred doesn''t change P(A)","Also: P(A and B) = P(A) × P(B)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-010', 'probability-basics', 'P(A) = 0.4, P(B) = 0.5, P(A and B) = 0.2. Find P(A or B).', '["0.5","0.7","0.9","1.1"]', '0.7', 2, '["P(A or B) = P(A) + P(B) - P(A and B)","P(A or B) = 0.4 + 0.5 - 0.2","P(A or B) = 0.7"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-011', 'probability-basics', 'Which probability value is NOT valid?', '["0","0.5","1","1.2"]', '1.2', 1, '["Probability must be between 0 and 1","0 ≤ P ≤ 1","1.2 > 1, so it''s not valid","Probability cannot exceed 1 (or 100%)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-012', 'probability-basics', 'A bag contains 3 red and 5 blue marbles. Two marbles are drawn without replacement. Are these events independent or dependent?', '["Independent","Dependent","Mutually exclusive","Cannot determine"]', 'Dependent', 2, '["Without replacement means the first draw affects the second","After drawing one marble, probabilities change","There are fewer marbles for the second draw","The events are dependent"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-013', 'probability-basics', 'Subjective probability is based on:', '["Mathematical formulas","Observed frequencies","Personal judgment or belief","Equally likely outcomes"]', 'Personal judgment or belief', 1, '["Classical: equally likely outcomes","Empirical: observed frequencies","Subjective: personal belief or judgment","Example: ''I think there''s a 60% chance of rain''"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-014', 'probability-basics', 'Events A and B partition the sample space. P(A) = 0.35. What is P(B)?', '["0.35","0.65","0.70","Cannot determine"]', '0.65', 2, '["Partition means A and B cover everything with no overlap","P(A) + P(B) = 1","P(B) = 1 - P(A)","P(B) = 1 - 0.35 = 0.65"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('pb-015', 'probability-basics', 'Classical probability assumes:', '["Events are dependent","Outcomes are equally likely","Data has been collected","Probabilities sum to more than 1"]', 'Outcomes are equally likely', 1, '["Classical probability: P = favorable outcomes / total outcomes","This assumes all outcomes are equally likely","Example: fair die, each face has P = 1/6","Used when outcomes have equal chances"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-001', 'contingency-tables', 'A two-way table has 200 total observations. Cell (Row 1, Column 1) has 45 observations. What is the joint probability for this cell?', '["0.125","0.225","0.45","45"]', '0.225', 1, '["Joint probability = cell count / grand total","Joint probability = 45 / 200","Joint probability = 0.225"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-002', 'contingency-tables', 'In a table with row totals 80 and 120 (grand total 200), what is the marginal probability of Row 1?', '["0.20","0.40","0.60","0.80"]', '0.40', 1, '["Marginal probability = row total / grand total","Marginal probability = 80 / 200","Marginal probability = 0.40"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-003', 'contingency-tables', 'P(A) = 0.3, P(B) = 0.5, P(A and B) = 0.1. Using the addition rule, find P(A or B).', '["0.5","0.6","0.7","0.8"]', '0.7', 1, '["P(A or B) = P(A) + P(B) - P(A and B)","P(A or B) = 0.3 + 0.5 - 0.1","P(A or B) = 0.7"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-004', 'contingency-tables', 'In a survey, 40% of people exercise. If 5 unrelated people are randomly selected, what is the probability that all 5 exercise?', '["0.01024","0.02","0.40","2.0"]', '0.01024', 2, '["Independent events: P(all) = p^n","P(all 5 exercise) = (0.40)^5","= 0.01024"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-005', 'contingency-tables', '30% of a population has a trait. For 4 random unrelated people, what is P(at least one has the trait)?', '["0.2401","0.30","0.7599","1.20"]', '0.7599', 2, '["P(at least one) = 1 - P(none)","P(none) = (1-0.30)^4 = (0.70)^4","P(none) = 0.2401","P(at least one) = 1 - 0.2401 = 0.7599"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-006', 'contingency-tables', 'A probability of 0.03 for an event is considered:', '["Usual","Unusual (< 0.05)","Impossible","Certain"]', 'Unusual (< 0.05)', 1, '["Events with P < 0.05 are unusual","0.03 < 0.05","The event is unusual","It happens less than 5% of the time"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-007', 'contingency-tables', 'Use this table:
| | Yes | No | Total |
|Male| 30 | 20 | 50 |
|Female| 25 | 25 | 50 |
|Total| 55 | 45 | 100 |

Find P(Male AND Yes).', '["0.25","0.30","0.50","0.55"]', '0.30', 1, '["Joint probability = cell count / grand total","P(Male AND Yes) = 30 / 100","P(Male AND Yes) = 0.30"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-008', 'contingency-tables', 'Using the same table, find P(Female OR Yes).', '["0.55","0.75","0.80","1.05"]', '0.75', 2, '["P(Female OR Yes) = P(Female) + P(Yes) - P(Female AND Yes)","P(Female) = 50/100 = 0.50","P(Yes) = 55/100 = 0.55","P(Female AND Yes) = 25/100 = 0.30","P(Female OR Yes) = 0.50 + 0.55 - 0.30 = 0.75"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-009', 'contingency-tables', 'If 25% of people are left-handed and we select 3 unrelated people, P(exactly 0 left-handed) = ?', '["0.25","0.421875","0.75","0.578125"]', '0.421875', 2, '["P(none left-handed) = (1-0.25)^3","= (0.75)^3","= 0.421875"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-010', 'contingency-tables', 'What distinguishes a joint probability from a marginal probability?', '["Joint is always larger","Joint involves two conditions, marginal involves one","Marginal involves two conditions, joint involves one","They are the same"]', 'Joint involves two conditions, marginal involves one', 1, '["Joint: P(A and B) - probability of both conditions","Marginal: P(A) or P(B) - probability of one condition","Joint uses a cell; marginal uses a row/column total","Joint involves the intersection of two events"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-011', 'contingency-tables', '15% of parts are defective. In a sample of 6 random parts, what is P(none defective)?', '["0.15","0.377","0.623","0.85"]', '0.377', 2, '["P(none defective) = (1-0.15)^6","= (0.85)^6","= 0.377 (approximately)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-012', 'contingency-tables', 'Is P = 0.048 for an event unusual?', '["Yes, because P < 0.05","No, because P > 0","No, because P < 0.5","Cannot determine"]', 'Yes, because P < 0.05', 1, '["An event is unusual if P < 0.05","0.048 < 0.05","Yes, the event is unusual"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-013', 'contingency-tables', '60% of customers order a drink. For 3 random customers, P(all 3 order drink) = ?', '["0.180","0.216","0.60","1.80"]', '0.216', 2, '["P(all) = p^n for independent events","P(all 3 order) = (0.60)^3","= 0.216"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-014', 'contingency-tables', 'From a table: P(A) = 0.6 and P(B|A) = 0.5. Find P(A and B).', '["0.10","0.30","0.50","1.10"]', '0.30', 2, '["P(A and B) = P(A) × P(B|A)","P(A and B) = 0.6 × 0.5","P(A and B) = 0.30"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ct-015', 'contingency-tables', 'In a survey of 500 people: 200 like coffee, 150 like tea, 50 like both. How many like coffee OR tea?', '["250","300","350","400"]', '300', 2, '["Coffee OR Tea = Coffee + Tea - Both","= 200 + 150 - 50","= 300 people"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-001', 'discrete-distributions', 'Is this a valid probability distribution?
x: 1, 2, 3
P(x): 0.2, 0.5, 0.4', '["Yes","No, probabilities don''t sum to 1","No, x values must start at 0","No, probabilities are too high"]', 'No, probabilities don''t sum to 1', 1, '["Check: do all P(x) sum to 1?","0.2 + 0.5 + 0.4 = 1.1","1.1 ≠ 1","Not a valid distribution"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-002', 'discrete-distributions', 'Calculate E(X):
x: 0, 1, 2, 3
P(x): 0.1, 0.3, 0.4, 0.2', '["1.5","1.7","2.0","2.5"]', '1.7', 2, '["E(X) = Σ x × P(x)","= 0(0.1) + 1(0.3) + 2(0.4) + 3(0.2)","= 0 + 0.3 + 0.8 + 0.6","= 1.7"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-003', 'discrete-distributions', 'For the distribution: x = {1, 2, 3}, P(x) = {0.25, 0.5, 0.25}, the mean μ = 2. What is the variance?', '["0.25","0.5","1","2"]', '0.5', 2, '["Var(X) = Σ(x-μ)² × P(x)","= (1-2)²(0.25) + (2-2)²(0.5) + (3-2)²(0.25)","= 1(0.25) + 0(0.5) + 1(0.25)","= 0.25 + 0 + 0.25 = 0.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-004', 'discrete-distributions', 'If E(X) = 10 and Var(X) = 4, what is the standard deviation σ?', '["2","4","16","20"]', '2', 1, '["σ = √Var(X)","σ = √4","σ = 2"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-005', 'discrete-distributions', 'A probability distribution has P(X ≤ 3) = 0.7 and P(X ≤ 4) = 0.85. What is P(X = 4)?', '["0.15","0.55","0.70","0.85"]', '0.15', 2, '["P(X = 4) = P(X ≤ 4) - P(X ≤ 3)","P(X = 4) = 0.85 - 0.70","P(X = 4) = 0.15"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-006', 'discrete-distributions', 'Two independent events have P(A) = 0.3 and P(B) = 0.4. What is P(both A and B occur)?', '["0.12","0.30","0.40","0.70"]', '0.12', 1, '["For independent events: P(A and B) = P(A) × P(B)","P(A and B) = 0.3 × 0.4","P(A and B) = 0.12"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-007', 'discrete-distributions', 'If P(X > 5) = 0.2, what is P(X ≤ 5)?', '["0.2","0.5","0.8","5"]', '0.8', 1, '["P(X ≤ 5) = 1 - P(X > 5)","P(X ≤ 5) = 1 - 0.2","P(X ≤ 5) = 0.8"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-008', 'discrete-distributions', 'A discrete random variable X can take values 0, 1, 2. P(0)=0.3, P(2)=0.5. What is P(1)?', '["0.1","0.2","0.3","0.8"]', '0.2', 1, '["All probabilities must sum to 1","P(0) + P(1) + P(2) = 1","0.3 + P(1) + 0.5 = 1","P(1) = 1 - 0.8 = 0.2"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-009', 'discrete-distributions', 'Calculate E(X) for:
x: -10, 0, 20
P(x): 0.2, 0.5, 0.3', '["-2","0","4","10"]', '4', 2, '["E(X) = Σ x × P(x)","= (-10)(0.2) + (0)(0.5) + (20)(0.3)","= -2 + 0 + 6","= 4"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-010', 'discrete-distributions', 'Three fair coins are flipped. X = number of heads. Find P(X ≥ 2).', '["0.25","0.375","0.5","0.75"]', '0.5', 2, '["P(X ≥ 2) = P(X=2) + P(X=3)","P(X=2) = 3/8 (3 ways: HHT, HTH, THH)","P(X=3) = 1/8 (1 way: HHH)","P(X ≥ 2) = 3/8 + 1/8 = 4/8 = 0.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-011', 'discrete-distributions', 'For a valid probability distribution, which condition(s) must be met?', '["ΣP(x) = 1 only","0 ≤ P(x) ≤ 1 only","Both: 0 ≤ P(x) ≤ 1 AND ΣP(x) = 1","Neither is required"]', 'Both: 0 ≤ P(x) ≤ 1 AND ΣP(x) = 1', 1, '["Two conditions must be met:","1. Each probability between 0 and 1","2. All probabilities sum to 1","Both conditions are required"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-012', 'discrete-distributions', 'If X has E(X) = 5, what is E(2X + 3)?', '["8","10","13","16"]', '13', 2, '["E(aX + b) = a × E(X) + b","E(2X + 3) = 2 × E(X) + 3","= 2 × 5 + 3","= 13"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-013', 'discrete-distributions', 'The standard deviation of a distribution measures:', '["The center of the distribution","The spread around the mean","The maximum value","The probability of success"]', 'The spread around the mean', 1, '["Standard deviation measures spread/variability","It indicates how far values typically are from the mean","Larger σ = more spread","Smaller σ = less spread"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-014', 'discrete-distributions', 'P(X < 4) = 0.6 and P(X = 4) = 0.15. What is P(X ≤ 4)?', '["0.45","0.60","0.75","0.85"]', '0.75', 2, '["P(X ≤ 4) = P(X < 4) + P(X = 4)","P(X ≤ 4) = 0.6 + 0.15","P(X ≤ 4) = 0.75"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('dd-015', 'discrete-distributions', 'The mean of a discrete probability distribution is also called:', '["Median","Mode","Expected value","Variance"]', 'Expected value', 1, '["The mean μ = E(X) = expected value","It''s the long-run average","Calculated as Σ x × P(x)","Mean and expected value are the same"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-001', 'expected-value-casino', 'A game costs $5 to play. You win $20 with probability 0.2, otherwise you lose your $5. What is the expected profit?', '["-$1","$0","$1","$3"]', '-$1', 2, '["Win: profit = $20 - $5 = $15, P = 0.2","Lose: profit = -$5, P = 0.8","E(profit) = 15(0.2) + (-5)(0.8)","= 3 - 4 = -$1"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-002', 'expected-value-casino', 'A casino game has expected profit of -$0.50 per $10 bet. What is the house edge?', '["0.5%","5%","10%","50%"]', '5%', 2, '["House edge = -E(profit) / bet × 100%","Per $1 bet: E(profit) = -$0.05","House edge = 0.05 × 100% = 5%","Or: $0.50/$10 = 5%"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-003', 'expected-value-casino', 'A game is fair. What is the expected profit?', '["-$1","$0","$1","Depends on the bet"]', '$0', 1, '["A fair game has no advantage for either side","Expected profit = $0","Neither player nor house has an edge","This is the definition of a fair game"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-004', 'expected-value-casino', 'Expected profit per $1 bet is -$0.0526. If you bet $100, what is your expected loss?', '["$0.53","$5.26","$52.60","$526"]', '$5.26', 2, '["Expected profit scales with bet size","E(profit for $100) = -$0.0526 × 100","= -$5.26","Expected loss is $5.26"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-005', 'expected-value-casino', 'A slot machine pays out 92 cents for every dollar wagered on average. What is the house edge?', '["4%","8%","46%","92%"]', '8%', 2, '["Payout = $0.92 per $1 bet","Player loses $0.08 per $1 on average","House edge = $0.08 / $1 × 100%","House edge = 8%"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-006', 'expected-value-casino', 'Game A has house edge 2%. Game B has house edge 5%. Which is better for the player?', '["Game A","Game B","They''re equal","Cannot determine"]', 'Game A', 1, '["Lower house edge = better for player","Game A: player loses 2% on average","Game B: player loses 5% on average","Game A is better (lower expected loss)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-007', 'expected-value-casino', 'You bet $25 on a game with 4% house edge. What is your expected loss?', '["$0.25","$1.00","$4.00","$25.00"]', '$1.00', 2, '["Expected loss = Bet × House edge","= $25 × 0.04","= $1.00"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-008', 'expected-value-casino', 'A game costs $10. You have 30% chance to win $20 profit. What is the expected profit?', '["-$4","-$1","$2","$6"]', '-$1', 2, '["Win: profit = $20, P = 0.30","Lose: profit = -$10, P = 0.70","E(profit) = 20(0.3) + (-10)(0.7)","= 6 - 7 = -$1"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-009', 'expected-value-casino', 'Expected profit is -$2 per game. After 100 games, what total loss do you expect?', '["$2","$50","$100","$200"]', '$200', 1, '["Total expected = Games × Expected per game","= 100 × (-$2)","= -$200","Expected loss is $200"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-010', 'expected-value-casino', 'A casino game has 48% chance of winning even money (bet returned plus equal amount). What is the house edge?', '["2%","4%","48%","52%"]', '4%', 2, '["Win: profit = +$1, P = 0.48","Lose: profit = -$1, P = 0.52","E(profit) = 1(0.48) + (-1)(0.52) = -0.04","House edge = 4%"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-011', 'expected-value-casino', 'If a game has positive expected value for the player, which statement is TRUE?', '["The house always wins","The player has the advantage","The game is fair","The expected profit is 0"]', 'The player has the advantage', 1, '["Positive E(profit) > 0","This means player wins on average","Player has the advantage","Casinos avoid offering such games"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-012', 'expected-value-casino', 'You flip a coin. Heads = win $10, Tails = lose $10. What is the expected profit?', '["-$5","$0","$5","$10"]', '$0', 1, '["E(profit) = 10(0.5) + (-10)(0.5)","= 5 - 5","= $0","This is a fair game"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-013', 'expected-value-casino', 'A lottery ticket costs $2. P(win $500) = 0.001, P(win $10) = 0.02. What is the expected profit?', '["-$1.70","-$1.30","$0.30","$8.50"]', '-$1.30', 3, '["E(profit) = 498(0.001) + 8(0.02) + (-2)(0.979)","= 0.498 + 0.16 - 1.958","= -$1.30 (approximately)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-014', 'expected-value-casino', 'Roulette: Betting on red gives 18/38 chance to double your bet. What is the house edge?', '["2.63%","5.26%","18%","47.37%"]', '5.26%', 2, '["P(win) = 18/38, P(lose) = 20/38","E(profit per $1) = 1(18/38) + (-1)(20/38)","= (18-20)/38 = -2/38 = -0.0526","House edge = 5.26%"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('ev-015', 'expected-value-casino', 'Game A: E(profit) = -$0.02 per dollar. Game B: E(profit) = -$0.05 per dollar. For a $50 bet, how much more do you expect to lose on Game B?', '["$0.03","$0.50","$1.50","$3.00"]', '$1.50', 2, '["Game A expected loss: $50 × 0.02 = $1.00","Game B expected loss: $50 × 0.05 = $2.50","Difference = $2.50 - $1.00 = $1.50"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-001', 'binomial', 'A coin is flipped 10 times, counting heads. What are n, p, and q?', '["n=10, p=0.5, q=0.5","n=10, p=1, q=0","n=5, p=0.5, q=0.5","n=10, p=0.1, q=0.9"]', 'n=10, p=0.5, q=0.5', 1, '["n = number of trials = 10 flips","p = probability of success (heads) = 0.5","q = 1 - p = probability of failure = 0.5"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-002', 'binomial', 'For a binomial distribution with n = 20 and p = 0.4, calculate the mean μ.', '["4","8","12","20"]', '8', 1, '["μ = np","μ = 20 × 0.4","μ = 8"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-003', 'binomial', 'For n = 25, p = 0.3, calculate the standard deviation σ.', '["2.29","5.25","7.5","18.75"]', '2.29', 2, '["σ = √(npq)","q = 1 - 0.3 = 0.7","σ = √(25 × 0.3 × 0.7)","σ = √5.25 ≈ 2.29"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-004', 'binomial', 'Which is NOT a requirement for a binomial distribution?', '["Fixed number of trials","Independent trials","Exactly two outcomes per trial","Variable probability of success"]', 'Variable probability of success', 1, '["Binomial requires CONSTANT probability","Fixed n: yes, required","Independent trials: yes, required","Two outcomes: yes, required","Variable p: NO, p must be constant"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-005', 'binomial', 'Translate P(X < 5) into words for ''number of heads in 12 flips''.', '["Exactly 5 heads","At most 5 heads","Fewer than 5 heads","At least 5 heads"]', 'Fewer than 5 heads', 1, '["P(X < 5) means X can be 0, 1, 2, 3, or 4","This is ''fewer than 5''","Also written as P(X ≤ 4)","''At most 5'' would be P(X ≤ 5)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-006', 'binomial', 'If P(X = 12) = 0.03 in a binomial experiment, is getting exactly 12 successes unusual?', '["Yes, because P < 0.05","No, because P > 0","No, because 12 is a large number","Cannot determine"]', 'Yes, because P < 0.05', 2, '["An outcome is unusual if P < 0.05","P(X = 12) = 0.03","0.03 < 0.05","Yes, getting exactly 12 is unusual"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-007', 'binomial', 'Express ''at most 4'' symbolically.', '["P(X < 4)","P(X ≤ 4)","P(X > 4)","P(X ≥ 4)"]', 'P(X ≤ 4)', 1, '["''At most 4'' includes 4 and below","X can be 0, 1, 2, 3, or 4","This is written as X ≤ 4","P(at most 4) = P(X ≤ 4)"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-008', 'binomial', '80% of patients recover. For 5 patients, what is P(all 5 recover)?', '["0.32768","0.4","0.8","4"]', '0.32768', 2, '["P(all 5) = p^n = (0.8)^5","= 0.32768"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-009', 'binomial', 'Using the complement: P(X ≥ 1) = ?', '["P(X = 0)","P(X = 1)","1 - P(X = 0)","1 - P(X = 1)"]', '1 - P(X = 0)', 1, '["P(X ≥ 1) = 1 - P(X < 1)","P(X < 1) = P(X = 0)","So P(X ≥ 1) = 1 - P(X = 0)","This is much easier than summing P(1)+P(2)+..."]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-010', 'binomial', 'n = 50, p = 0.2. μ = 10, σ = 2.83. Is it unusual to get 18 or more successes?', '["Yes, because 18 > μ + 2σ","No, because 18 < 50","No, because p = 0.2 is small","Cannot determine"]', 'Yes, because 18 > μ + 2σ', 2, '["Usual range: μ ± 2σ","Upper bound: 10 + 2(2.83) = 15.66","18 > 15.66","18 is above the usual range, so unusual"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-011', 'binomial', 'Why might drawing cards WITHOUT replacement NOT be binomial?', '["Not enough trials","Probability changes with each draw","Outcomes aren''t binary","Sample size is too large"]', 'Probability changes with each draw', 2, '["Binomial requires constant probability","Without replacement, removing a card changes the deck","P(ace) changes after each draw","Trials are not independent"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-012', 'binomial', 'For n = 12, p = 0.5, μ = 6, σ = 1.73. What is the usual range of successes?', '["0 to 12","3 to 9","4 to 8","6 to 12"]', '3 to 9', 2, '["Usual range: μ - 2σ to μ + 2σ","Lower: 6 - 2(1.73) = 6 - 3.46 = 2.54 ≈ 3","Upper: 6 + 2(1.73) = 6 + 3.46 = 9.46 ≈ 9","Usual range: about 3 to 9"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-013', 'binomial', '20% of items are defective. In a sample of 10, what is P(at least 1 defective)?', '["0.1074","0.20","0.8","0.8926"]', '0.8926', 2, '["P(at least 1) = 1 - P(0)","P(0) = (0.8)^10 = 0.1074","P(at least 1) = 1 - 0.1074","= 0.8926"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-014', 'binomial', 'A binomial experiment has n = 8, p = 0.25. What is the mean number of successes?', '["0.25","2","4","8"]', '2', 1, '["μ = np","μ = 8 × 0.25","μ = 2"]', false);
INSERT INTO "Question" ("id", "moduleTag", "prompt", "choices", "correctAnswer", "difficulty", "solutionSteps", "isGenerated") VALUES ('bn-015', 'binomial', 'For binomial with n=100, p=0.6, what is the standard deviation?', '["2.4","4.9","24","60"]', '4.9', 2, '["σ = √(npq)","q = 1 - 0.6 = 0.4","σ = √(100 × 0.6 × 0.4)","σ = √24 ≈ 4.9"]', false);

-- INSERT FLASHCARDS
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-001', 'graphs-data', 'How do I know when to use a histogram vs. a bar chart?', 'Ask: Is my data numerical or categorical?

• HISTOGRAM: Numerical data (ages, weights, scores)
  - Bars touch (continuous data)
  - X-axis has numbers

• BAR CHART: Categorical data (colors, majors, brands)
  - Bars have gaps
  - X-axis has category names', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-002', 'graphs-data', 'What makes a Pareto chart special?', 'Bars are arranged in DESCENDING ORDER (tallest to shortest)

Example: Customer complaints
- Shipping: 45 (first)
- Quality: 30 (second)
- Service: 15 (third)

Used to identify the "vital few" problems to fix first.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-003', 'graphs-data', 'In a boxplot, what does the box show?', 'The box shows the middle 50% of data (IQR)

• Left edge = Q1 (25th percentile)
• Line inside = Median (50th percentile)
• Right edge = Q3 (75th percentile)

The whiskers extend to the smallest/largest non-outlier values.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-004', 'graphs-data', 'How do I calculate class width from a histogram?', 'Class Width = Upper Limit − Lower Limit

Example: Classes are 60-70, 70-80, 80-90
Class width = 70 − 60 = 10

All classes in a histogram have the SAME width.', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-005', 'graphs-data', 'When should I use a time-series graph?', 'Use when showing how something changes OVER TIME

Examples:
• Stock prices over a year
• Monthly sales
• Temperature throughout the day

X-axis = Time, Y-axis = Value being measured', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-006', 'graphs-data', 'What is a frequency polygon and when is it useful?', 'A line graph connecting midpoints of histogram bars.

Most useful when COMPARING two or more distributions on the same graph.

Multiple overlapping histograms are hard to read, but overlapping frequency polygons are clear.

The area under the curve represents total frequency.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-007', 'graphs-data', 'How do I estimate the median from a histogram?', '1. Calculate total frequency (n)
2. Find median position: (n+1)/2
3. Count frequencies from left until you reach that position
4. The median is in that class

Example: n=50, median at position 25.5
Count: 5+12=17 (not there), 5+12+18=35 (passed it!)
Median is in the third class.', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-008', 'graphs-data', 'In a boxplot, what do the whiskers show?', 'Whiskers extend to the most extreme values WITHIN the fences:

• Lower fence = Q1 − 1.5 × IQR
• Upper fence = Q3 + 1.5 × IQR

Whiskers go to the smallest/largest data points that are NOT outliers.

Points beyond the fences are plotted individually as outliers.', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-009', 'graphs-data', 'What two features can a time-series graph show?', '1. TREND: Overall long-term direction (upward, downward, flat)

2. SEASONALITY: Regular patterns that repeat at fixed intervals

Example: Monthly sales show:
• Upward trend (sales growing over years)
• Seasonality (peaks every December for holidays)', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-010', 'graphs-data', 'How do I identify an outlier on a boxplot?', 'Points plotted INDIVIDUALLY beyond the whiskers are outliers.

If you see a dot or asterisk beyond the whisker, that value is an outlier.

To verify: Check if value > Q3 + 1.5×IQR or value < Q1 - 1.5×IQR

Example: If upper whisker ends at 72 but there''s a point at 85, then 85 is an outlier.', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-011', 'graphs-data', 'How do I determine the shape of a histogram?', 'Look at where data clusters and where the tail extends:

• SYMMETRIC: Peak in middle, similar tails on both sides
  Pattern: low→high→low (e.g., 3,8,15,22,18,10,4)

• SKEWED RIGHT: Peak on left, tail extends right
  Pattern: high→gradually lower

• SKEWED LEFT: Peak on right, tail extends left
  Pattern: gradually higher→high', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-012', 'graphs-data', 'What is a class midpoint in a histogram?', 'Midpoint = (Lower Limit + Upper Limit) ÷ 2

Example: Class 60-70
Midpoint = (60 + 70) ÷ 2 = 65

Midpoints are used:
• In frequency polygons (connect the midpoint of each bar''s top)
• To estimate the mean from grouped data', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-gd-013', 'graphs-data', 'Which value is always shown inside the box of a boxplot?', 'The MEDIAN (Q2) is always shown as a line inside the box.

The box shows:
• Left edge = Q1
• Line inside = MEDIAN
• Right edge = Q3

Note: Some boxplots also show the mean as a dot or plus sign, but the median line is always present.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-001', 'distribution-shape', 'How do I determine skewness from mean and median?', 'Compare mean to median:

• Mean > Median → Skewed RIGHT (tail on right)
  Example: Income data ($85K mean, $52K median)

• Mean < Median → Skewed LEFT (tail on left)
  Example: Test scores (75 mean, 82 median)

• Mean ≈ Median → Symmetric', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-002', 'distribution-shape', 'What shape would ages at a retirement community have?', 'SKEWED LEFT

Why? Most people cluster at older ages (65-85), with fewer younger people (just meeting minimum age).

The tail extends toward younger ages = LEFT skew

Remember: The tail points in the direction of skew!', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-003', 'distribution-shape', 'What measures should I use for skewed data?', 'For SKEWED data, use:
• Center: MEDIAN (resistant to outliers)
• Spread: IQR (resistant to outliers)

For SYMMETRIC data, use:
• Center: MEAN
• Spread: Standard Deviation

Outliers affect mean/SD but NOT median/IQR!', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-004', 'distribution-shape', 'Can you determine the shape of categorical data?', 'NO! Shape (skewed, symmetric) only applies to QUANTITATIVE data.

Categorical data (favorite colors, car brands) doesn''t have a meaningful order, so "skewness" makes no sense.

Example: Red=25, Blue=40, Green=18
This is NOT skewed - it''s just frequencies of categories.', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-005', 'distribution-shape', 'What shape would test scores on a very easy exam have?', 'SKEWED LEFT (negatively skewed)

Most students score high (cluster on the right), with a few low scores creating a tail to the left.

Similarly:
• Very hard exam → Skewed RIGHT (most score low)
• Moderate exam → Symmetric (bell-shaped)', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-006', 'distribution-shape', 'What does ''positively skewed'' mean?', 'Positively skewed = Skewed RIGHT

The tail extends toward POSITIVE (higher) values.

Mean is GREATER than median.

Examples: Income, house prices, waiting times

Remember: Positive = Right, Negative = Left', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-007', 'distribution-shape', 'In a skewed right distribution, what''s the order of mean, median, mode?', 'Mode < Median < Mean

(Read left to right, like the tail direction)

The mean gets "pulled" toward the tail.

For skewed LEFT:
Mean < Median < Mode', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ds-008', 'distribution-shape', 'What distribution shape do SAT scores follow?', 'SYMMETRIC (approximately normal)

SAT scores are designed to follow a bell curve with:
• Mean ≈ Median ≈ Mode
• Most scores near the middle
• Fewer scores at extremes
• μ ≈ 500, σ ≈ 100 for each section', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-001', 'frequency-tables', 'How do I calculate relative frequency?', 'Relative Frequency = Class Frequency ÷ Total

Example:
Class 70-80 has 15 students, total = 50 students
Relative freq = 15/50 = 0.30 or 30%

All relative frequencies must sum to 1 (or 100%).', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-002', 'frequency-tables', 'What is cumulative frequency?', 'Running total of frequencies up to that class

Example:
Class | Freq | Cumulative
0-10  |  5   |    5
10-20 |  8   |   13  (5+8)
20-30 | 12   |   25  (13+12)

Used to answer "how many at or below X?"', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-003', 'frequency-tables', 'How do I find the mean from grouped data?', 'x̄ = Σ(f × m) ÷ Σf

Steps:
1. Find midpoint of each class: m = (lower + upper)/2
2. Multiply: frequency × midpoint
3. Sum all (f × m)
4. Divide by total frequency

This gives an APPROXIMATION of the true mean.', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-004', 'frequency-tables', 'How do I find the class midpoint?', 'Midpoint = (Lower Limit + Upper Limit) ÷ 2

Example:
Class 20-30:
Midpoint = (20 + 30) ÷ 2 = 25

Class 45-55:
Midpoint = (45 + 55) ÷ 2 = 50', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-005', 'frequency-tables', 'What''s the difference between class limits and class boundaries?', 'CLASS LIMITS: The actual values defining the class
Example: 10-19, 20-29

CLASS BOUNDARIES: Adjusted to close gaps between classes
Example: 9.5-19.5, 19.5-29.5

Boundaries are used for continuous data to avoid gaps.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-006', 'frequency-tables', 'How do I calculate class width when creating classes?', 'Class Width = (Max − Min) ÷ Number of Classes

Always ROUND UP!

Example: Data from 23 to 87, want 6 classes
Width = (87 − 23) ÷ 6 = 10.67 → Round up to 11

Use classes: 23-33, 34-44, 45-55, etc.', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-007', 'frequency-tables', 'What is Sturges'' Rule for number of classes?', 'Number of classes ≈ 1 + 3.322 × log₁₀(n)

Or roughly: k ≈ 1 + log₂(n)

Example: n = 50 data points
k ≈ 1 + 3.322 × log₁₀(50)
k ≈ 1 + 3.322 × 1.7 ≈ 6.6 → Use 6 or 7 classes', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-008', 'frequency-tables', 'What is cumulative relative frequency?', 'Running total of relative frequencies

Example:
Class | Rel.Freq | Cum.Rel.Freq
A     |  0.20    |   0.20
B     |  0.35    |   0.55  (0.20+0.35)
C     |  0.45    |   1.00  (0.55+0.45)

Last value must equal 1.00 (or 100%)', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-009', 'frequency-tables', 'How do I find standard deviation from grouped data?', 's = √[Σf(m − x̄)² ÷ (n − 1)]

Steps:
1. Calculate mean x̄ from grouped data
2. For each class: (midpoint − mean)²
3. Multiply by frequency: f × (m − x̄)²
4. Sum all, divide by (n−1), take square root

This is an approximation!', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ft-010', 'frequency-tables', 'How do I find which class contains the median?', '1. Find n/2 (median position)
2. Use cumulative frequencies
3. Median is in the first class where cumulative freq ≥ n/2

Example: n=40, median at position 20
Cum.Freq: 12, 30, 40
Median is in class 2 (first class where cum.freq ≥ 20)', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-001', 'quartiles-iqr', 'How do I find Q1, Q2, Q3?', '1. Sort data from smallest to largest
2. Q2 (median) = middle value
3. Q1 = median of lower half
4. Q3 = median of upper half

Example: 2, 5, 7, 8, 12, 15, 19
• Q2 = 8 (middle)
• Q1 = 5 (median of 2,5,7)
• Q3 = 15 (median of 12,15,19)', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-002', 'quartiles-iqr', 'How do I calculate IQR and find outliers?', 'IQR = Q3 − Q1

Outlier fences:
• Lower fence = Q1 − 1.5 × IQR
• Upper fence = Q3 + 1.5 × IQR

Any value BELOW lower fence or ABOVE upper fence is an OUTLIER.

Example: Q1=25, Q3=48, IQR=23
Lower fence = 25 − 34.5 = −9.5
Upper fence = 48 + 34.5 = 82.5', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-003', 'quartiles-iqr', 'Five-number summary: What are the 5 numbers?', '1. Minimum
2. Q1 (25th percentile)
3. Median (Q2, 50th percentile)
4. Q3 (75th percentile)
5. Maximum

These 5 values are used to construct a boxplot.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-004', 'quartiles-iqr', 'When should I use median/IQR vs mean/SD?', 'Use MEDIAN and IQR when:
• Data is skewed
• Outliers are present
• Distribution is not normal

Use MEAN and SD when:
• Data is symmetric
• No outliers
• Distribution is approximately normal

Median/IQR are RESISTANT to outliers!', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-005', 'quartiles-iqr', 'If a value equals the fence exactly, is it an outlier?', 'NO! A value must be BEYOND the fence to be an outlier.

Outlier: value < lower fence OR value > upper fence

A value exactly AT the fence is the most extreme non-outlier value.

The whisker in a boxplot would extend exactly to this value.', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-006', 'quartiles-iqr', 'If I add 10 to every value, how do IQR and range change?', 'Adding a constant to all values:
• IQR stays the SAME
• Range stays the SAME
• Q1, Q2, Q3 all increase by 10

Multiplying all values by a constant:
• IQR is multiplied by that constant
• Range is multiplied by that constant', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-007', 'quartiles-iqr', 'What is the relationship between median and Q2?', 'They are the SAME thing!

Q2 = Median = 50th percentile

"Q2" is just another name for the median, used in the context of quartiles.

Q1 = 25th percentile
Q2 = 50th percentile (median)
Q3 = 75th percentile', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-qi-008', 'quartiles-iqr', 'How can I tell if a distribution is skewed from a boxplot?', 'Look at the median position in the box:

• Median closer to Q1 (left) → Skewed RIGHT
• Median closer to Q3 (right) → Skewed LEFT
• Median in center → Symmetric

Also: Longer whisker on right → Skewed right', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-001', 'normal-distribution', 'Empirical Rule (68-95-99.7)', 'For NORMAL distributions:

• 68% of data within μ ± 1σ
• 95% of data within μ ± 2σ
• 99.7% of data within μ ± 3σ

Example: μ=100, σ=15
• 68% between 85-115
• 95% between 70-130
• 99.7% between 55-145', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-002', 'normal-distribution', 'How do I calculate a z-score?', 'z = (x − μ) / σ

Example: Test score x=85, μ=70, σ=10
z = (85 − 70) / 10 = 1.5

Meaning: The score is 1.5 standard deviations ABOVE the mean.

Negative z = below mean
Positive z = above mean', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-003', 'normal-distribution', 'How do I find x when I know the z-score?', 'x = μ + z × σ

Example: μ=500, σ=100, z=−1.5
x = 500 + (−1.5)(100) = 500 − 150 = 350

Useful for finding cutoff scores:
"What score is 2 standard deviations above the mean?"', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-004', 'normal-distribution', 'When is a value considered "unusual"?', 'A value is UNUSUAL if |z| ≥ 2

This means more than 2 standard deviations from the mean.

Example: μ=100, σ=15
• x=70: z=(70-100)/15 = −2 → UNUSUAL (barely)
• x=125: z=(125-100)/15 = 1.67 → NOT unusual
• x=140: z=(140-100)/15 = 2.67 → UNUSUAL', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-005', 'normal-distribution', 'What is the standard normal distribution?', 'A normal distribution with:
• Mean μ = 0
• Standard deviation σ = 1

Any normal distribution can be converted to standard normal using z-scores.

Z-tables give probabilities for the standard normal distribution.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-006', 'normal-distribution', 'What does a z-score of 0 indicate?', 'The value equals the mean exactly.

z = (x − μ) / σ = 0

This means x = μ

A z-score of 0 is the most typical/average value in the distribution.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-007', 'normal-distribution', 'How do I compare scores from different tests?', 'Convert both to z-scores and compare!

Example:
Student A: 85 on test with μ=80, σ=5
z = (85-80)/5 = 1.0

Student B: 90 on test with μ=82, σ=4
z = (90-82)/4 = 2.0

Student B performed better relative to their class (higher z).', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-nd-008', 'normal-distribution', 'What percentage of data falls between z = -1 and z = 1?', '68% (from the Empirical Rule)

This is the "one standard deviation" range.

Similarly:
• Between z = -2 and z = 2: 95%
• Between z = -3 and z = 3: 99.7%', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-001', 'regression-correlation', 'How do I interpret the slope in ŷ = a + bx?', 'Slope (b) = change in y for each 1-unit increase in x

Example: ŷ = 15 + 2.5x (predicting sales from ads)
"For each additional $1000 spent on advertising, sales increase by $2,500."

• Positive b = y increases as x increases
• Negative b = y decreases as x increases', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-002', 'regression-correlation', 'What does r² tell me?', 'r² = proportion of variation in y explained by x

Example: r² = 0.81
"81% of the variation in y is explained by the linear relationship with x."

• r² is always between 0 and 1
• Higher r² = better fit
• r² = 0.81 means r = ±0.9', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-003', 'regression-correlation', 'How do I calculate a residual?', 'Residual = Actual − Predicted = y − ŷ

Example: Actual y = 45, Predicted ŷ = 42
Residual = 45 − 42 = +3

• Positive residual: actual > predicted (underestimated)
• Negative residual: actual < predicted (overestimated)
• Residual = 0: perfect prediction', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-004', 'regression-correlation', 'Interpolation vs Extrapolation: Which is risky?', 'EXTRAPOLATION is risky!

Interpolation: Predicting WITHIN the data range
• Example: Data from x=10 to x=50, predict at x=30 ✓

Extrapolation: Predicting OUTSIDE the data range
• Example: Data from x=10 to x=50, predict at x=80 ✗
• The relationship may not hold outside the observed range', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-005', 'regression-correlation', 'What is a lurking variable?', 'A variable NOT in the study that affects both x and y

Example: Ice cream sales (x) and drowning deaths (y) are correlated.
Lurking variable: TEMPERATURE
• Hot weather → more ice cream
• Hot weather → more swimming → more drownings

Correlation ≠ Causation because of lurking variables!', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-006', 'regression-correlation', 'What are explanatory and response variables?', 'EXPLANATORY (x): The predictor, independent variable
• What we use to make predictions
• Plotted on x-axis

RESPONSE (y): The outcome, dependent variable
• What we''re trying to predict
• Plotted on y-axis

Example: Height (x) predicts Weight (y)', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-007', 'regression-correlation', 'What does correlation coefficient r tell me?', 'r measures strength and direction of LINEAR relationship

• r = 1: Perfect positive correlation
• r = -1: Perfect negative correlation
• r = 0: No linear correlation
• |r| close to 1: Strong relationship
• |r| close to 0: Weak relationship

Range: -1 ≤ r ≤ 1', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-008', 'regression-correlation', 'What does a curved residual plot indicate?', 'A linear model is NOT appropriate!

Good residual plot: Random scatter, no pattern
Bad residual plot: Curved pattern visible

If residuals show a curve, the relationship between x and y is nonlinear. Consider a different model.', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-rc-009', 'regression-correlation', 'If r = 0.7, what is r²? If r² = 0.64, what is r?', 'r² = r × r

If r = 0.7: r² = 0.49
(49% of variation explained)

If r² = 0.64: r = ±√0.64 = ±0.8
(Need context to determine + or -)

For a positive relationship: r = +0.8', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-001', 'probability-basics', 'What is the sample space?', 'The set of ALL possible outcomes

Examples:
• Coin flip: S = {H, T}
• Die roll: S = {1, 2, 3, 4, 5, 6}
• Two coins: S = {HH, HT, TH, TT}

Every probability problem starts with identifying the sample space.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-002', 'probability-basics', 'What is the complement rule?', 'P(not A) = 1 − P(A)

Example: P(rain) = 0.3
P(no rain) = 1 − 0.3 = 0.7

Useful shortcut:
P(at least one) = 1 − P(none)
P(A or B or C) = 1 − P(not A and not B and not C)', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-003', 'probability-basics', 'Addition Rule: P(A or B) = ?', 'P(A or B) = P(A) + P(B) − P(A and B)

Example: P(King) = 4/52, P(Heart) = 13/52, P(King AND Heart) = 1/52
P(King or Heart) = 4/52 + 13/52 − 1/52 = 16/52

If DISJOINT (can''t happen together):
P(A or B) = P(A) + P(B)', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-004', 'probability-basics', 'Disjoint vs Independent: What''s the difference?', 'DISJOINT (Mutually Exclusive):
• Cannot happen at the same time
• P(A and B) = 0
• Example: Rolling a 2 AND a 5 on one die

INDEPENDENT:
• One doesn''t affect the other
• P(A and B) = P(A) × P(B)
• Example: Two coin flips

Disjoint events are NEVER independent!', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-005', 'probability-basics', 'Multiplication Rule for Independent Events', 'P(A and B) = P(A) × P(B)

Example: Flip coin twice
P(Heads and Heads) = 0.5 × 0.5 = 0.25

For multiple independent events:
P(all A) = p^n
P(none A) = (1−p)^n
P(at least one A) = 1 − (1−p)^n', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-006', 'probability-basics', 'What are the three types of probability?', '1. CLASSICAL: P = favorable/total
   (Equally likely outcomes, like dice or cards)

2. EMPIRICAL: P = observed frequency/total trials
   (Based on experiments or data)

3. SUBJECTIVE: Personal judgment/belief
   ("I think there''s a 70% chance of rain")', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-007', 'probability-basics', 'What is the probability of rolling a sum of 7 with two dice?', 'P(sum = 7) = 6/36 = 1/6

Winning combinations:
(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)

Total outcomes with two dice: 6 × 6 = 36

7 is the most likely sum with two dice!', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-008', 'probability-basics', 'Which probability values are valid?', 'Probability must be between 0 and 1:
0 ≤ P(A) ≤ 1

Valid: 0, 0.5, 0.999, 1
Invalid: -0.1, 1.2, 150%

Also: All probabilities in a distribution must sum to 1.', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-009', 'probability-basics', 'With vs without replacement: What''s the difference?', 'WITH replacement:
• Put item back after selecting
• Probabilities stay SAME
• Events are INDEPENDENT

WITHOUT replacement:
• Don''t put item back
• Probabilities CHANGE
• Events are DEPENDENT

Example: Drawing cards from a deck', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-pb-010', 'probability-basics', 'If events partition the sample space, what does that mean?', 'Events cover ALL possibilities with no overlap.

If A and B partition S:
• P(A) + P(B) = 1
• They are mutually exclusive
• Together they cover everything

Example: "Pass" and "Fail" partition exam results
If P(Pass) = 0.35, then P(Fail) = 0.65', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ct-001', 'contingency-tables', 'How do I find joint probability from a table?', 'Joint P(A and B) = cell count / grand total

Example:
           Male  Female  Total
Yes         30     45      75
No          20     15      35
Total       50     60     110

P(Male AND Yes) = 30/110 = 0.273', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ct-002', 'contingency-tables', 'How do I find marginal probability from a table?', 'Marginal probability = row or column total / grand total

Example:
           Male  Female  Total
Yes         30     45      75
No          20     15      35
Total       50     60     110

P(Male) = 50/110 = 0.455
P(Yes) = 75/110 = 0.682', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ct-003', 'contingency-tables', 'How do I find P(A or B) from a contingency table?', 'P(A or B) = P(A) + P(B) − P(A and B)

Or count: (row total + column total − cell count) / grand total

Example: P(Male or Yes)
= 50/110 + 75/110 − 30/110
= 95/110 = 0.864', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ct-004', 'contingency-tables', 'When is an event considered "unusual"?', 'An event is UNUSUAL if P < 0.05

This means it happens less than 5% of the time.

Example:
P(getting 10 heads in 10 flips) = 0.00098
This is unusual because 0.00098 < 0.05', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ct-005', 'contingency-tables', 'How do I find P(at least one) for independent selections?', 'P(at least one) = 1 − P(none)

Example: 30% have trait, select 4 people
P(none) = (0.70)⁴ = 0.2401
P(at least one) = 1 − 0.2401 = 0.7599

Much easier than P(1) + P(2) + P(3) + P(4)!', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ct-006', 'contingency-tables', 'How do I find P(all have trait) for independent selections?', 'P(all) = p^n

Example: 40% exercise, 5 people selected
P(all 5 exercise) = (0.40)⁵ = 0.01024

For P(none): (1−p)^n = (0.60)⁵ = 0.07776', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-dd-001', 'discrete-distributions', 'What makes a valid probability distribution?', 'Two rules:
1. Every probability must be between 0 and 1
   0 ≤ P(x) ≤ 1

2. All probabilities must sum to 1
   ΣP(x) = 1

If EITHER rule is violated, it''s NOT valid.

Example: 0.2 + 0.5 + 0.4 = 1.1 ≠ 1 → Invalid!', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-dd-002', 'discrete-distributions', 'How do I calculate expected value E(X)?', 'E(X) = Σ[x × P(x)]

Multiply each outcome by its probability, then sum.

Example:
x  |  1    2    3
P  | 0.2  0.5  0.3

E(X) = 1(0.2) + 2(0.5) + 3(0.3)
     = 0.2 + 1.0 + 0.9 = 2.1', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-dd-003', 'discrete-distributions', 'How do I calculate variance for a discrete distribution?', 'Var(X) = Σ[(x − μ)² × P(x)]

Or use: Var(X) = E(X²) − [E(X)]²

Standard deviation: σ = √Var(X)

Example: If E(X)=2.1 and E(X²)=5.3
Var(X) = 5.3 − (2.1)² = 5.3 − 4.41 = 0.89
σ = √0.89 = 0.94', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-dd-004', 'discrete-distributions', 'How do I find a missing probability?', 'Use the fact that all probabilities sum to 1.

Example: P(0)=0.3, P(2)=0.5, find P(1)
P(0) + P(1) + P(2) = 1
0.3 + P(1) + 0.5 = 1
P(1) = 1 − 0.3 − 0.5 = 0.2', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-dd-005', 'discrete-distributions', 'If E(X) = 5, what is E(2X + 3)?', 'Use linear transformation rules:

E(aX + b) = a × E(X) + b

E(2X + 3) = 2 × E(X) + 3
         = 2 × 5 + 3
         = 13

For variance: Var(aX + b) = a² × Var(X)', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ev-001', 'expected-value-casino', 'How do I calculate expected profit from a bet?', 'E(profit) = Σ(profit × probability)

Example: Bet $10, win $25 with prob 0.4, lose with prob 0.6

Profit if win: $25 − $10 = $15
Profit if lose: −$10

E(profit) = 15(0.4) + (−10)(0.6)
         = 6 − 6 = $0', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ev-002', 'expected-value-casino', 'How do I calculate house edge?', 'House Edge = −E(profit per $1 bet) × 100%

Example: E(profit) = −$0.053 per $1 bet
House Edge = −(−0.053) × 100% = 5.3%

Meaning: On average, the casino keeps 5.3¢ of every $1 bet.

If E(profit) = 0, the game is FAIR.', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ev-003', 'expected-value-casino', 'How does bet size affect expected profit?', 'Expected profit scales linearly with bet size.

If E(profit) = −$0.05 per $1 bet:
• $10 bet: E = −$0.50
• $100 bet: E = −$5.00
• $1000 bet: E = −$50.00

Formula: E($X bet) = E($1 bet) × X', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ev-004', 'expected-value-casino', 'What does it mean if a game has positive expected value?', 'The PLAYER has the advantage!

Positive E(profit) → Player wins on average
Negative E(profit) → House wins on average (most casino games)
E(profit) = 0 → Fair game

Casinos never offer games with positive expected value for players.', 'definition');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-ev-005', 'expected-value-casino', 'Slot machine pays 92 cents per dollar wagered. What''s the house edge?', 'E(profit per $1) = $0.92 − $1.00 = −$0.08

House Edge = −(−$0.08) × 100% = 8%

The casino keeps 8 cents of every dollar played.

Alternatively: 100% − 92% = 8% house edge', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-bn-001', 'binomial', 'What are the 4 conditions for binomial?', 'B-I-N-S:

1. Binary outcomes (success/failure only)
2. Independent trials
3. Number of trials is fixed (n)
4. Same probability (p) for each trial

Example: 10 coin flips, counting heads ✓
Counter-example: Drawing cards without replacement ✗', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-bn-002', 'binomial', 'Binomial mean and standard deviation formulas', 'Mean: μ = np
Standard deviation: σ = √(npq)

where q = 1 − p

Example: n=100, p=0.3, q=0.7
μ = 100(0.3) = 30
σ = √(100 × 0.3 × 0.7) = √21 = 4.58', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-bn-003', 'binomial', 'How do I translate probability phrases?', '• "Exactly k" → P(X = k)
• "At most k" → P(X ≤ k)
• "At least k" → P(X ≥ k)
• "Fewer than k" → P(X < k) = P(X ≤ k−1)
• "More than k" → P(X > k) = P(X ≥ k+1)

Tip: "At least 1" = 1 − P(X = 0)', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-bn-004', 'binomial', 'When is a binomial outcome unusual?', 'Method 1: Check if x is outside μ ± 2σ

Method 2: Check if P(X = k) < 0.05

Example: n=100, p=0.5
μ = 50, σ = 5
Usual range: 40 to 60

Getting 35 heads is unusual (outside range)', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-bn-005', 'binomial', 'Complement shortcut for binomial', 'P(X ≥ 1) = 1 − P(X = 0)

Much easier than calculating P(1) + P(2) + ... + P(n)!

Example: P(at least one defective in 20 items)
= 1 − P(0 defective)
= 1 − (0.95)^20
= 1 − 0.358 = 0.642', 'formula');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-bn-006', 'binomial', 'Why is drawing cards WITHOUT replacement NOT binomial?', 'The trials are NOT independent!

Without replacement:
• P(Ace on 1st draw) = 4/52
• P(Ace on 2nd draw | Ace on 1st) = 3/51

Probability CHANGES with each draw.

With replacement would be binomial (probability stays 4/52).', 'rule');
INSERT INTO "Flashcard" ("id", "moduleTag", "front", "back", "cardType") VALUES ('fc-bn-007', 'binomial', 'How do I identify n, p, q in a problem?', 'n = number of trials (fixed)
p = probability of success (what you''re counting)
q = 1 − p (probability of failure)

Example: Flip coin 10 times, count heads
n = 10 trials
p = 0.5 (P of heads)
q = 0.5 (P of tails)', 'rule');
