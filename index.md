---
layout: index
---

# SkipTo, version 3.1

## by PayPal Accessibility Team and University of Illinois

See the [Authors](#authors) section for more information.

SkipTo is a replacement for your old classic "Skipnav" link, (so please use it as such)!
The SkipTo script creates a drop-down menu consisting of the links to the important places on a given web page. The menu will make it easier for keyboard and screen reader users to quickly jump to the desired location by simply choosing it from the list of options.

![Example Screen Shot](https://paypal.github.io/skipto/images/example_screen_shot.png "Example Screen Shot")

## How it works

1. The SkipTo menu becomes visible the first time the user tabs into the page.
2. Once the keyboard focus is on the menu, pressing the ENTER or the SPACEBAR key will pull down the list of high-level headings and landmarks on the current page.
3. Use arrow keys to select your choice and press ENTER to skip to it.
4. If you decide to reach the menu again, simply press the built-in access key (0 by default). See the notes on [Access keys](#access-keys) for More information on how to use them.

## How do I get it on my web site

If you are using Drupal or Wordpress, you are in great luck. We are providing plugins for both of these content management systems below. The SkipTo can also be related from the [Drupal](https://drupal.org/project/SkipTo) and [Wordpress](https://wordpress.org/plugins/skip-to/) repositories.

To sweeten your day even more, the GreaseMonkey script and Safari bookmarklet are also available. See the "downloads" section below for related links.
By the way, this page is a great chance to see the "SkipTo menu" in action! Did you find the menu at the top?

## What about plain JavaScript

All you need are either SkipTo.js or SkipTo.min.js from the "compiled/js" directory. Please note that SkipTo.min.js is a minified (a lighter version) of the script.
If you would like to be able to debug your production-ready script, include the provided SkipTo.min.map file as well.

To use the SkipTo script, just include it at the bottom of your HTML page or template, as follows:

```html
<script type="text/javascript" src="https://paypal.github.io/skipto/downloads/js/SkipTo.min.js"></script>
```

Note that by default the path is set to load the script from the Github external source. If this is not what you want, please make sure that "src" points to the place where you put the Javascript file, otherwise, things will not work as intended.

## Configuring SkipTo options

By default, SkipTo menu will include the following places on the page:

* Heading (e.g h1, h2, h3 and h4 elements).
* ARIA landmarks (e.g. banner, navigation, main and search).
* HTML5 Section Elements (e.g. main, section[aria-label], section[aria-labelledby]

and options:

* The default "access key" is set to 0.
* The menu button by default is visible, but can be configured to appear on keyboard focus only.

You may have different requirements for your web site and include other heading levels as well as ARIA landmarks.

You will need to provide a JSON object containing the necessary configuration parameters for changing behaviors or styling from default values. This may look like the following:

```html
<script>
var skipToConfig =
{
 "settings": {
    "skipTo": {
      "headings"     : "main h1, main h2",
      "landmarks"    : "main search nav aside",
      "customClass"  : "MyClass",
      "displayOption": "popup",
      "attachElement": ".MyCustomClass" // or "attachElement": "#MyCustomId"
    }
  }
};
</script>
```

The code above  will need  to be inserted before including the SkipTo.js or SkipTo.min.js into your page or template.

### Notes

* Most parameters are optional.
* SkipTo can be attached to any element on the page (see the "attachElement" parameter). if no "attachElement" is found, the script will be attached as the first element after body.
* When the custom class is specified (see the customClass parameter), the user can override the style, EG

```css
.skipTo.MyCustomClass {
  background:  red;
  left: 50px;
  top: 50px;
}
```

## Compiling CSS and JavaScript

You may feel slightly adventurous and decide to change some colors or even enhance the script with your changes. Once you do this, here is how you compile the skipTo script for production.

1. [Get NodeJS from https://nodejs.org](https://nodejs.org) and install it on the operating system of your choice.
2. Get the [latest code from Github from https://github.com/paypal/skipto](https://github.com/paypal/skipto).
3. After unzipping or downloading the source code into the directory of your choice, switch to that directory and type these commands:

    ```sh
    sudo npm install grunt-cli -g
    npm install
    grunt
    ```

4. You should now have a directory called **`compiled`** with the necessary files in it.
5. See instructions above on which files you need to get the SkipTo script running on your web site.

## Cleaning up

If you would like to revert your local code repository to its initial state, simply run

```sh
grunt clean
```

from the root directory of your repository.

## Of course, we want feedback

Please do not hesitate to [raise issues and comment on Github](https://github.com/paypal/skipto/issues) if something doesn't work or you have ideas on how to improve the script.

Happy skipping!

PayPal Accessibility Gang
[Twitter: @PayPalInclusive](https://www.twitter.com/PayPalInclusive)

## Authors

**Nawaz Khan**
[https://github.com/mpnkhan](https://github.com/mpnkhan) || [@mpnkhan](https://twitter.com/mpnkhan)

**Victor Tsaran**
[https://github.com/vick08](https://github.com/vick08) || [@vick08](https://twitter.com/vick08)

**Ron Feathers**
[https://github.com/rfeathers](https://github.com/rfeathers) || [@ronfeathers](https://twitter.com/ronfeathers)

**Marc Kocher**
[https://github.com/mdkocher](https://github.com/mdkocher) || [@marckocher](https://twitter.com/marckocher)

**Jon Gunderson**
[https://github.com/jongund](https://github.com/jongund)

**Nicholas Hoyt**
[https://github.com/nhoyt](https://github.com/nhoyt)

## Access keys

Access keys work  just like regular shortcut keys except that they need a browser-specific modifier key in order to work. For example, to use the "SkipTo" access key, you would press the modifier key + the access key (0 in this particular case). here is a quick list for how this would work in most popular browsers.

* Mozilla Firefox -- ALT+SHIFT+0.
* Google Chrome -- CONTROL+ALT+0 (Windows) and CONTROL+OPTION+0 (Mac OS).
* Safari -- CONTROL+0.

## SkipTo Gallery

[An inclusive car booking company in Bangalore](https://www.kickstartcabs.com/)

[Sai Gagan Accessibility Solutions](https://sgaccessibility.com/sites/)

[Srinivasu blog](https://srinivasu.org/blog/)

If you like your site to be listed in this list, please comment on this [github ticket](https://github.com/paypal/skipto/issues/21)
