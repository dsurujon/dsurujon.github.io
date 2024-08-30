---
title       : Tm Calculator for Primer Sequences
subtitle    : A Shiny application
author      : dsurujon
job         : 
framework   : io2012        # {io2012, html5slides, shower, dzslides, ...}
highlighter : highlight.js  # {highlight.js, prettify, highlight}
hitheme     : tomorrow      # 
widgets     : []            # {mathjax, quiz, bootstrap}
mode        : selfcontained # {standalone, draft}
knit        : slidify::knit2slides
---
<!-- Limit image width and height -->
<style type='text/css'>
img {
    max-height: 400px;
    max-width: 964px;
}
</style>
## Polymerase Chain Reaction

 - Polymerase Chain Reaction (PCR) is a ubiquitous application of molecular biology where a very large number of copies of a DNA sequence can be generated in a relatively short amount of time. 
 - PCR requires a DNA template to be copied, molecules involved in DNA replication, and a pair of primers (short DNA sequences) that mark the beginning and the end of the region being amplified on the template. 
 - There are three critical temperatures in the PCR cycle: Denaturation, Annealing and Elongation. 
 - The denaturation and extension temperatures are almost always around 95C and 72C. The annealing temperature however needs to be customized depending on the primers being used. 
 - The annealing temperature is usually a couple of degrees lower than the melting temperature (Tm) of the primers. This ensures that the primers are binding the desired site on the template, and nowhere else (unspecific binding)

--- .class #id

## Annealing Temperature and Tm

 - It can sometimes be tricky to find the optimal annealing temperature for a given set of primers. 
 - The shiny app "primer-tm" which can be accessed [here](https://dsurujon.shinyapps.io/primer-tm) calculates the melting temperature of a given pair of primers. 
 - The melting temperature is defined as the temperature at which 50% of the primer DNA is dissociated from its reverse complement strand. 
 - The melting temperature depends on several factors: 
 	1. The length of the primer sequences
 	2. The abundance of each nucleotide (A, C, T, or G) in the sequence
 	3. Concentration of ions and other molecules

<i>note: For the sake of simplicity, the Shiny app only considers the first two factors and assumes the ionic concentrations are constant.</i>

--- .class #id

## Example Calculation
 We calculate the Tm (in Celsius) as 
```
 4x(number of G's and C's) + 2*(number of A's and T's)
```
 for primers shorter than 14 nucleotides. For longer nucleotides, the calculation is as follows:
```
 64.9 + 41x((number of G's and C's)-16.4)/(length of primer)
```

```r
myprimer <- "AGCTGATCGGATAAATCGAAG"
primer1A <- nchar(gsub("[^a]","",myprimer))
primer1T <- nchar(gsub("[^t]","",myprimer))
primer1G <- nchar(gsub("[^g]","",myprimer))
primer1C <- nchar(gsub("[^c]","",myprimer))
if (nchar(myprimer) < 14) {T1 <- 4*(primer1G + primer1C) + 2*(primer1A + primer1T)
}else {T1 <- 64.9 + 41 * (primer1G + primer1C - 16.4) / (nchar(myprimer))}
print(T1)
```

```
## [1] 32.88095
```


--- .class #id

## Notes 

-The shiny app valiates whether the entered sequence is a DNA sequence or not using the following snippet:

```r
#define valid bases
bases<-c("a","c","g","t")
#convert to lowercase
p1<-tolower(input$primer1)
#unique characters in the oligo sequence
uniques1<-unique(strsplit(p1,"")[[1]])
output$seq1<-renderText({
	if (input$goButton==0) ""
	#check if the entered sequence is a valid DNA sequence
	else if (all(lapply(uniques1,function (i) i %in% bases))) p1
	else "please enter a valid dna sequence"})
```

-The calculations are based on <a href="https://www.promega.com/techserv/tools/biomath/calc11.htm">this website</a>



