---
title: Using CSS Filters with SVGs
date: '2019-04-21'
---

Manipulating SVG fills with powerful tools like the ones listed in my [Modifying SVG background fills](/articles/svg-background-fills/) article have provided an easy way to work with background images. When you have direct access to the code behind the SVG on your page, you can target each `<path />` just like a normal selector in your CSS.

A recent project had me dealing with a third-case: Manipulating the fill of an SVG that was referenced only through an `<img src />`; nothing more. The difference here from the other normal options I've used was I didn't have direct access to the source behind the image. Luckily, this was all controlled under a CMS I managed, but the content itself came from an external source and I did not want to store multiple variations that would only differ in the fill.

As I started down the path of storing image dimensions and using the [`mask`](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) property to "cut-out" the needed shape, I came across a pretty unique tool that took advantage of [`filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) to achieve a color overlay. While the result doesn't always come out perfect, there's some handy subtext that allows you to try the calculation again until you achieve the desired result.

<CodePen codePenId="Pjoqqp" />

A tip I decided to also take from this tool (since it assumes a black vector) was to prepend `brightness(0) saturate(100%)` from the output to ensure the values I grabbed would be as true as possible.

<CodePen codePenId="EJRRPE" />

While there are a few different options available to achieve this type of overlay; including referencing an SVG element that includes a filter using the `feColorMatrix`, I found this to be much easier to re-use across a project and pretty fun to interact with.
