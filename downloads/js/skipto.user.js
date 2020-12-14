// -----------------------------------------------------
// Title: Skip to Options User script
// version: 3.1.0
// Date: 2020-12-14
// Author: PayPal Accessibility Team and University of Illinois
// Homepage: https://github.com/paypal/skipto
// Copyright (c) 2020 PayPal Accessibility Team and University of Illinois
// -----------------------------------------------------
//
// ==UserScript==
// @name skipto
// @namespace skipto
// @description This plugin provides a dynamically-generated drop-down menu that allows keyboard and screen reader users to quickly skip to the most important places on the webpage.
// @include *
// ==/UserScript==

/*! skipto - v3.1.0 - 2020-12-14
* https://github.com/paypal/skipto
* Copyright (c) 2020 PayPal Accessibility Team and University of Illinois; Licensed BSD */
 /*@cc_on @*/
/*@if (@_jscript_version >= 5.8) @*/

!function(){"use strict";var SkipTo={domNode:null,buttonNode:null,menuNode:null,menuitemNodes:[],firstMenuitem:!1,lastMenuitem:!1,firstChars:[],headingLevels:[],skipToIdIndex:1,showAllLandmarksSelector:"main, [role=main], [role=search], nav, [role=navigation], section[aria-label], section[aria-labelledby], section[title], [role=region][aria-label], [role=region][aria-labelledby], [role=region][title], form[aria-label], form[aria-labelledby], aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]",showAllHeadingsSelector:"h1, h2, h3, h4, h5, h6",config:{enableActions:!0,enableHeadingLevelShortcuts:!0,enableHelp:!0,accesskey:"0",attachElement:"header",displayOption:"static",containerElement:"div",containerRole:"",customClass:"",accesskeyNotSupported:" is not supported on this browser.",buttonTitle:"Keyboard Navigation",buttonTitleWithAccesskey:'Keyboard Navigation\nAccesskey is "$key"',buttonLabel:"Skip To Content",menuLabel:"Landmarks and Headings",landmarkImportantGroupLabel:"Important Landmarks",landmarkAllGroupLabel:"All Landmarks",headingImportantGroupLabel:"Important Headings",headingAllGroupLabel:"All Headings",headingLevelLabel:"Heading level",mainLabel:"main",searchLabel:"search",navLabel:"navigation",regionLabel:"region",asideLabel:"aside",footerLabel:"footer",headerLabel:"header",formLabel:"form",msgNoLandmarksFound:"No landmarks found",msgNoHeadingsFound:"No headings found",actionGroupLabel:"Actions",actionShowHeadingsHelp:'Toggles between showing "All" and "Important" headings.',actionShowImportantHeadingsLabel:"Show Important Headings ($num)",actionShowAllHeadingsLabel:"Show All headings ($num)",actionShowLandmarksHelp:'Toggles between showing "All" and "Important" landmarks.',actionShowImportantLandmarksLabel:"Show Important landmarks ($num)",actionShowAllLandmarksLabel:"Show All landmarks ($num)",actionShowImportantHeadingsAriaLabel:"Show $num Important Headings",actionShowAllHeadingsAriaLabel:"Show All $num headings",actionShowImportantLandmarksAriaLabel:"Show $num Important landmarks",actionShowAllLandmarksAriaLabel:"Show All $num landmarks",landmarks:'main, [role="main"], [role="search"], nav, [role="navigation"], aside, [role="complementary"]',headings:'main h1, [role="main"] h1, main h2, [role="main"] h2',colorTheme:"",positionLeft:"",buttonColor:"",buttonBackgroundColor:"",buttonBorderColor:"",buttonColorFocus:"",buttonFocusBackgroundColor:"",buttonFocusBorderColor:"",menuBackgroundColor:"",menuitemColor:"",menuitemBackgroundColor:"",menuitemFocusColor:"",menuitemFocusBackgroundColor:"",menuitemFocusBorderColor:""},colorThemes:{default:{positionLeft:"46%",buttonColor:"#1a1a1a",buttonBackgroundColor:"#eeeeee",buttonBorderColor:"#eeeeee",buttonFocusColor:"#000000",buttonFocusBackgroundColor:"#dcdcdc",buttonFocusBorderColor:"#1a1a1a",menuBackgroundColor:"#eeeeee",menuBorderColor:"1a1a1a",menuitemColor:"#1a1a1a",menuitemBackgroundColor:"#eeeeee",menuitemFocusColor:"#eeeeee",menuitemFocusBackgroundColor:"#1a1a1a",menuitemFocusBorderColor:"#1a1a1a"},illinois:{positionLeft:"46%",buttonColor:"#00132c",buttonBackgroundColor:"#dddede",buttonBorderColor:"#dddede",buttonFocusColor:"#00132c",buttonFocusBackgroundColor:"#cad9ef",buttonFocusBorderColor:"#ff552e",menuBackgroundColor:"#cad9ef",menuitemLevelOpacity:"0.7",menuBorderColor:"#ff552e",menuitemColor:"#00132c",menuitemBackgroundColor:"#cad9ef",menuitemFocusColor:"#eeeeee",menuitemFocusBackgroundColor:"#00132c",menuitemFocusBorderColor:"#ff552e"},aria:{positionLeft:"",buttonColor:"#005a9c;",buttonBackgroundColor:"#def",buttonBorderColor:"#def",buttonFocusColor:"#fff",buttonFocusBackgroundColor:"#005a9c",buttonFocusBorderColor:"#005a9c;",menuBackgroundColor:"#def",menuBorderColor:"#005a9c",menuitemColor:"#000",menuitemBackgroundColor:"#def",menuitemFocusColor:"#fff",menuitemFocusBackgroundColor:"#005a9c",menuitemFocusBorderColor:"#005a9c"}},defaultCSS:".skip-to.popup{position:absolute;top:-30em;left:-3000em}.skip-to,.skip-to.popup.focus{position:absolute;top:0;left:$positionLeft}.skip-to button{position:relative;margin:0;padding:6px 8px 6px 8px;border-width:0 1px 1px 1px;border-style:solid;border-radius:0 0 6px 6px;background-color:$buttonBackgroundColor;border-color:$buttonBorderColor;color:$buttonColor;z-index:1000}.skip-to [role=menu]{position:absolute;min-width:17em;display:none;margin:0;padding:.25rem;background-color:$menuBackgroundColor;border-width:2px;border-style:solid;border-color:$menuBorderColor;border-radius:5px;z-index:1000}.skip-to [role=group]{display:grid;grid-auto-rows:min-content;grid-row-gap:1px}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem]{padding:3px;display:block;width:auto;border-width:0;border-style:solid;color:$menuitemColor;background-color:$menuitemBackgroundColor;z-index:1000;display:grid;overflow-y:auto;grid-template-columns:repeat(6,1.2rem) 1fr;grid-column-gap:2px;font-size:1em}.skip-to [role=menuitem] .label:first-letter,.skip-to [role=menuitem] .level:first-letter{text-decoration:underline;text-transform:uppercase}.skip-to [role=menuitem] .level{text-align:right;padding-right:4px}.skip-to [role=menuitem] .label{margin:0;padding:0;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.skip-to [role=menuitem].skip-to-h1 .level{grid-column:1}.skip-to [role=menuitem].skip-to-h2 .level{grid-column:2}.skip-to [role=menuitem].skip-to-h3 .level{grid-column:3}.skip-to [role=menuitem].skip-to-h4 .level{grid-column:4}.skip-to [role=menuitem].skip-to-h5 .level{grid-column:5}.skip-to [role=menuitem].skip-to-h6 .level{grid-column:8}.skip-to [role=menuitem].skip-to-h1 .label{grid-column:2/8}.skip-to [role=menuitem].skip-to-h2 .label{grid-column:3/8}.skip-to [role=menuitem].skip-to-h3 .label{grid-column:4/8}.skip-to [role=menuitem].skip-to-h4 .label{grid-column:5/8}.skip-to [role=menuitem].skip-to-h5 .label{grid-column:6/8}.skip-to [role=menuitem].skip-to-h6 .label{grid-column:7/8}.skip-to [role=menuitem].skip-to-h1.no-level .label{grid-column:1/8}.skip-to [role=menuitem].skip-to-h2.no-level .label{grid-column:2/8}.skip-to [role=menuitem].skip-to-h3.no-level .label{grid-column:3/8}.skip-to [role=menuitem].skip-to-h4.no-level .label{grid-column:4/8}.skip-to [role=menuitem].skip-to-h5.no-level .label{grid-column:5/8}.skip-to [role=menuitem].skip-to-h6.no-level .label{grid-column:6/8}.skip-to [role=menuitem].skip-to-nesting-level-1 .nesting{grid-column:1}.skip-to [role=menuitem].skip-to-nesting-level-2 .nesting{grid-column:2}.skip-to [role=menuitem].skip-to-nesting-level-3 .nesting{grid-column:3}.skip-to [role=menuitem].skip-to-nesting-level-0 .label{grid-column:1/8}.skip-to [role=menuitem].skip-to-nesting-level-1 .label{grid-column:2/8}.skip-to [role=menuitem].skip-to-nesting-level-2 .label{grid-column:3/8}.skip-to [role=menuitem].skip-to-nesting-level-3 .label{grid-column:4/8}.skip-to [role=menuitem].action .label,.skip-to [role=menuitem].no-items .label{grid-column:1/8}.skip-to [role=separator]{margin:1px 0 1px 0;padding:3px;display:block;width:auto;font-weight:700;text-align:left;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:$menuitemColor;background-color:$menuitemBackgroundColor;color:$menuitemColor;z-index:1000}.skip-to [role=separator]:first-child{border-radius:5px 5px 0 0}.skip-to [role=menuitem].last{border-radius:0 0 5px 5px}.skip-to.focus{display:block}.skip-to button:focus,.skip-to button:hover{background-color:$buttonFocusBackgroundColor;color:$buttonFocusColor;outline:0}.skip-to button:focus{padding:4px 7px 5px 7px;border-width:2px 2px 2px 2px;border-color:$buttonFocusBorderColor}.skip-to [role=menuitem]:focus{padding:1px;border-width:2px;border-style:solid;border-color:$menuitemFocusBorderColor;background-color:$menuitemFocusBackgroundColor;color:$menuitemFocusColor;outline:0}",updateStyle:function(stylePlaceholder,value,defaultValue){"string"==typeof value&&0!==value.length||(value=defaultValue);for(var index1=this.defaultCSS.indexOf(stylePlaceholder),index2=index1+stylePlaceholder.length;0<=index1&&index2<this.defaultCSS.length;)this.defaultCSS=this.defaultCSS.substring(0,index1)+value+this.defaultCSS.substring(index2),index2=(index1=this.defaultCSS.indexOf(stylePlaceholder,index2))+stylePlaceholder.length},addCSSColors:function(){var theme=this.colorThemes.default;"object"==typeof this.colorThemes[this.config.colorTheme]&&(theme=this.colorThemes[this.config.colorTheme]),this.updateStyle("$positionLeft",this.config.positionLeft,theme.positionLeft),this.updateStyle("$buttonColor",this.config.buttonColor,theme.buttonColor),this.updateStyle("$buttonBackgroundColor",this.config.buttonBackgroundColor,theme.buttonBackgroundColor),this.updateStyle("$buttonBorderColor",this.config.buttonBorderColor,theme.buttonBorderColor),this.updateStyle("$buttonFocusColor",this.config.buttonFocusColor,theme.buttonFocusColor),this.updateStyle("$buttonFocusBackgroundColor",this.config.buttonFocusBackgroundColor,theme.buttonFocusBackgroundColor),this.updateStyle("$buttonFocusBorderColor",this.config.buttonFocusBorderColor,theme.buttonFocusBorderColor),this.updateStyle("$menuBackgroundColor",this.config.menuBackgroundColor,theme.menuBackgroundColor),this.updateStyle("$menuBorderColor",this.config.menuBorderColor,theme.menuBorderColor),this.updateStyle("$menuitemColor",this.config.menuitemColor,theme.menuitemColor),this.updateStyle("$menuitemBackgroundColor",this.config.menuitemBackgroundColor,theme.menuitemBackgroundColor),this.updateStyle("$menuitemFocusColor",this.config.menuitemFocusColor,theme.menuitemFocusColor),this.updateStyle("$menuitemFocusBackgroundColor",this.config.menuitemFocusBackgroundColor,theme.menuitemFocusBackgroundColor),this.updateStyle("$menuitemFocusBorderColor",this.config.menuitemFocusBorderColor,theme.menuitemFocusBorderColor)},isNotEmptyString:function(str){return"string"==typeof str&&str.length},getBrowserSpecificAccesskey:function(accesskey){var hasOpera=navigator.userAgent.toLowerCase(),hasChrome=navigator.platform.toLowerCase(),hasWin=0<=hasChrome.indexOf("win"),hasMac=0<=hasChrome.indexOf("mac"),hasLinux=0<=hasChrome.indexOf("linux")||0<=hasChrome.indexOf("bsd"),hasFirefox=0<=hasOpera.indexOf("firefox"),hasChrome=0<=hasOpera.indexOf("chrome"),hasOpera=0<=hasOpera.indexOf("opr");if(hasWin||hasLinux){if(hasFirefox)return"Shift+Alt+"+accesskey;if(hasChrome||hasOpera)return"Alt+"+accesskey}return hasMac?"Control+Option+"+accesskey:accesskey+this.config.accesskeyNotSupported},init:function(config){var title=document.body;config&&this.setUpConfig(config),"string"!=typeof this.config.attachElement||(displayOption=document.querySelector(this.config.attachElement))&&displayOption.nodeType===Node.ELEMENT_NODE&&(title=displayOption),this.addCSSColors(),this.addStyleElement(this.defaultCSS),this.domNode=document.createElement(this.config.containerElement),this.domNode.classList.add("skip-to"),this.isNotEmptyString(this.config.customClass)&&this.domNode.classList.add(this.config.customClass),this.isNotEmptyString(this.config.containerRole)&&this.domNode.setAttribute("role",this.config.containerRole);var displayOption=this.config.displayOption;if("string"==typeof displayOption&&(displayOption=displayOption.trim().toLowerCase()).length)switch(this.config.displayOption){case"onfocus":case"popup":this.domNode.classList.add("popup")}title.firstElementChild?title.insertBefore(this.domNode,title.firstElementChild):title.appendChild(this.domNode),this.buttonNode=document.createElement("button"),this.buttonNode.textContent=this.config.buttonLabel,this.buttonNode.setAttribute("aria-haspopup","true"),this.buttonNode.setAttribute("aria-expanded","false"),this.buttonNode.setAttribute("accesskey",this.config.accesskey),this.isNotEmptyString(this.config.buttonTitleWithAccesskey)&&1===this.config.accesskey.length?(title=this.config.buttonTitleWithAccesskey.replace("$key",this.getBrowserSpecificAccesskey(this.config.accesskey)),this.buttonNode.setAttribute("title",title)):this.isNotEmptyString(this.config.buttonTitle)&&this.buttonNode.setAttribute("title",this.config.buttonTitle),this.domNode.appendChild(this.buttonNode),this.menuNode=document.createElement("div"),this.menuNode.setAttribute("role","menu"),this.domNode.appendChild(this.menuNode),this.buttonNode.addEventListener("keydown",this.handleButtonKeydown.bind(this)),this.buttonNode.addEventListener("click",this.handleButtonClick.bind(this)),this.domNode.addEventListener("focusin",this.handleFocusin.bind(this)),this.domNode.addEventListener("focusout",this.handleFocusout.bind(this)),window.addEventListener("mousedown",this.handleBackgroundMousedown.bind(this),!0)},setUpConfig:function(appConfig){var name,localConfig=this.config,appConfigSettings=void 0!==appConfig.settings?appConfig.settings.skipTo:{};for(name in appConfigSettings)void 0!==localConfig[name]&&("string"==typeof appConfigSettings[name]&&0<appConfigSettings[name].length||"boolean"==typeof appConfigSettings[name])?localConfig[name]=appConfigSettings[name]:console.log('** SkipTo Problem with user configuration option "'+name+'".')},addStyleElement:function(css){var styleNode=document.createElement("style"),headNode=document.getElementsByTagName("head")[0],css=document.createTextNode(css);styleNode.setAttribute("type","text/css"),styleNode.appendChild(css),headNode.appendChild(styleNode)},getFirstChar:function(label){var c="",label=label.querySelector(".label");return label&&label.textContent.length&&(c=label.textContent.trim()[0].toLowerCase()),c},getHeadingLevelFromAttribute:function(menuitem){var level="";return menuitem.hasAttribute("data-level")&&(level=menuitem.getAttribute("data-level")),level},updateKeyboardShortCuts:function(){var mi;this.firstChars=[],this.headingLevels=[];for(var i=0;i<this.menuitemNodes.length;i+=1)mi=this.menuitemNodes[i],this.firstChars.push(this.getFirstChar(mi)),this.headingLevels.push(this.getHeadingLevelFromAttribute(mi))},updateMenuitems:function(){var menuitemNodes=this.menuNode.querySelectorAll("[role=menuitem");this.menuitemNodes=[];for(var i=0;i<menuitemNodes.length;i+=1)this.menuitemNodes.push(menuitemNodes[i]);this.firstMenuitem=this.menuitemNodes[0],this.lastMenuitem=this.menuitemNodes[this.menuitemNodes.length-1],this.lastMenuitem.classList.add("last"),this.updateKeyboardShortCuts()},addMenuitemToGroup:function(tagNodeChild,mi){var tagNode,labelNode,menuitemNode=document.createElement("div");return menuitemNode.setAttribute("role","menuitem"),menuitemNode.classList.add(mi.class),menuitemNode.setAttribute("data-id",mi.dataId),menuitemNode.tabIndex=-1,mi.ariaLabel&&menuitemNode.setAttribute("aria-label",mi.ariaLabel),menuitemNode.addEventListener("keydown",this.handleMenuitemKeydown.bind(this)),menuitemNode.addEventListener("click",this.handleMenuitemClick.bind(this)),menuitemNode.addEventListener("mouseover",this.handleMenuitemMouseover.bind(this)),tagNodeChild.appendChild(menuitemNode),mi.class.includes("heading")&&(this.config.enableHeadingLevelShortcuts?(tagNode=document.createElement("span"),(tagNodeChild=document.createElement("span")).appendChild(document.createTextNode(mi.level)),tagNode.append(tagNodeChild),tagNode.appendChild(document.createTextNode(")")),tagNode.classList.add("level"),menuitemNode.append(tagNode)):menuitemNode.classList.add("no-level"),menuitemNode.setAttribute("data-level",mi.level),mi.tagName&&mi.tagName.length&&menuitemNode.classList.add("skip-to-"+mi.tagName)),mi.class.includes("landmark")&&(menuitemNode.setAttribute("data-nesting",mi.nestingLevel),menuitemNode.classList.add("skip-to-nesting-level-"+mi.nestingLevel),0<mi.nestingLevel&&mi.nestingLevel>this.lastNestingLevel&&((labelNode=document.createElement("span")).classList.add("nesting"),menuitemNode.append(labelNode)),this.lastNestingLevel=mi.nestingLevel),(labelNode=document.createElement("span")).appendChild(document.createTextNode(mi.name)),labelNode.classList.add("label"),menuitemNode.append(labelNode),menuitemNode},addMenuitemGroup:function(groupId,title){var labelNode,groupNode,menuNode=this.menuNode;return title&&((labelNode=document.createElement("div")).id=groupId+"-label",labelNode.setAttribute("role","separator"),labelNode.textContent=title,menuNode.appendChild(labelNode),(groupNode=document.createElement("div")).setAttribute("role","group"),groupNode.setAttribute("aria-labelledby",labelNode.id),groupNode.id=groupId,menuNode.appendChild(groupNode),menuNode=groupNode),groupNode},addMenuitemsToGroup:function(groupNode,menuitems,msgNoItemsFound){if(groupNode.innerHTML="",(this.lastNestingLevel=0)===menuitems.length){var item={};item.name=msgNoItemsFound,item.tagName="no tag",item.class="no-items",item.dataId="",this.addMenuitemToGroup(groupNode,item)}else for(var i=0;i<menuitems.length;i+=1)this.addMenuitemToGroup(groupNode,menuitems[i])},getHeadingsGroupLabel:function(option){return"all"===option?this.config.headingAllGroupLabel:this.config.headingImportantGroupLabel},getShowMoreHeadingsSelector:function(option){return"all"===option?this.showAllHeadingsSelector:this.config.headings},getShowMoreHeadingsLabel:function(n){var label=this.config.actionShowImportantHeadingsLabel;return"all"===n&&(label=this.config.actionShowAllHeadingsLabel),n=(n=this.getHeadings(this.getShowMoreHeadingsSelector(n)))&&n.length?n.length:"0",label.replace("$num",n)},getShowMoreHeadingsAriaLabel:function(n){var label=this.config.actionShowImportantHeadingsAriaLabel;return"all"===n&&(label=this.config.actionShowAllHeadingsAriaLabel),n=(n=this.getHeadings(this.getShowMoreHeadingsSelector(n)))&&n.length?n.length:"0",label.replace("$num",n)},addActionMoreHeadings:function(groupNode){var menuitemNode={};menuitemNode.name=this.getShowMoreHeadingsLabel("all"),menuitemNode.ariaLabel=this.getShowMoreHeadingsAriaLabel("all"),menuitemNode.tagName="action",menuitemNode.role="menuitem",menuitemNode.class="action",menuitemNode.dataId="skip-to-more-headings";menuitemNode=this.addMenuitemToGroup(groupNode,menuitemNode);menuitemNode.setAttribute("data-show-heading-option","all"),menuitemNode.title=this.config.actionShowHeadingsHelp},updateHeadingGroupMenuitems:function(option){var menuitemNode=this.getShowMoreHeadingsSelector(option),labelNode=this.getHeadings(menuitemNode),menuitemNode=document.getElementById("id-skip-to-group-headings");this.addMenuitemsToGroup(menuitemNode,labelNode,this.config.msgNoHeadingsFound),this.updateMenuitems(),menuitemNode.firstElementChild&&menuitemNode.firstElementChild.focus();labelNode=this.menuNode.querySelector("#id-skip-to-group-headings-label");labelNode.textContent=this.getHeadingsGroupLabel(option),option="all"===option?"important":"all";menuitemNode=this.menuNode.querySelector("[data-id=skip-to-more-headings]");menuitemNode.setAttribute("data-show-heading-option",option),menuitemNode.setAttribute("aria-label",this.getShowMoreHeadingsAriaLabel(option)),(labelNode=menuitemNode.querySelector("span.label")).textContent=this.getShowMoreHeadingsLabel(option)},getLandmarksGroupLabel:function(option){return"all"===option?this.config.landmarkAllGroupLabel:this.config.landmarkImportantGroupLabel},getShowMoreLandmarksSelector:function(option){return"all"===option?this.showAllLandmarksSelector:this.config.landmarks},getShowMoreLandmarksLabel:function(n){var label="all"===n?this.config.actionShowAllLandmarksLabel:this.config.actionShowImportantLandmarksLabel,n=this.getLandmarks(this.getShowMoreLandmarksSelector(n));return n=n&&n.length?n.length:"0",label.replace("$num",n)},getShowMoreLandmarksAriaLabel:function(n){var label="all"===n?this.config.actionShowAllLandmarksAriaLabel:this.config.actionShowImportantLandmarksAriaLabel,n=this.getLandmarks(this.getShowMoreLandmarksSelector(n));return n=n&&n.length?n.length:"0",label.replace("$num",n)},addActionMoreLandmarks:function(groupNode){var menuitemNode={};menuitemNode.name=this.getShowMoreLandmarksLabel("all"),menuitemNode.ariaLabel=this.getShowMoreLandmarksAriaLabel("all"),menuitemNode.tagName="action",menuitemNode.role="menuitem",menuitemNode.class="action",menuitemNode.dataId="skip-to-more-landmarks";menuitemNode=this.addMenuitemToGroup(groupNode,menuitemNode);menuitemNode.setAttribute("data-show-landmark-option","all"),menuitemNode.title=this.config.actionShowLandmarksHelp},updateLandmarksGroupMenuitems:function(option){var menuitemNode=this.getShowMoreLandmarksSelector(option),labelNode=this.getLandmarks(menuitemNode,"all"===option),menuitemNode=document.getElementById("id-skip-to-group-landmarks");this.addMenuitemsToGroup(menuitemNode,labelNode,this.config.msgNoLandmarksFound),this.updateMenuitems(),menuitemNode.firstElementChild&&menuitemNode.firstElementChild.focus();labelNode=this.menuNode.querySelector("#id-skip-to-group-landmarks-label");labelNode.textContent=this.getLandmarksGroupLabel(option),option="all"===option?"important":"all";menuitemNode=this.menuNode.querySelector("[data-id=skip-to-more-landmarks]");menuitemNode.setAttribute("data-show-landmark-option",option),menuitemNode.setAttribute("aria-label",this.getShowMoreLandmarksAriaLabel(option)),(labelNode=menuitemNode.querySelector("span.label")).textContent=this.getShowMoreLandmarksLabel(option)},createMenu:function(){for(var groupNode,headingElements;this.menuNode.lastElementChild;)this.menuNode.removeChild(this.menuNode.lastElementChild);headingElements=this.getLandmarks(),groupNode=this.addMenuitemGroup("id-skip-to-group-landmarks",this.config.landmarkImportantGroupLabel),this.addMenuitemsToGroup(groupNode,headingElements,this.config.msgNoLandmarksFound),headingElements=this.getHeadings(),groupNode=this.addMenuitemGroup("id-skip-to-group-headings",this.config.headingImportantGroupLabel),this.addMenuitemsToGroup(groupNode,headingElements,this.config.msgNoHeadingsFound),this.config.enableActions&&(groupNode=this.addMenuitemGroup("id-skip-to-group-actions",this.config.actionGroupLabel),this.addActionMoreHeadings(groupNode),this.addActionMoreLandmarks(groupNode)),this.updateMenuitems()},setFocusToMenuitem:function(menuitem){menuitem&&menuitem.focus()},setFocusToFirstMenuitem:function(){this.setFocusToMenuitem(this.firstMenuitem)},setFocusToLastMenuitem:function(){this.setFocusToMenuitem(this.lastMenuitem)},setFocusToPreviousMenuitem:function(menuitem){var newMenuitem=menuitem===this.firstMenuitem?this.lastMenuitem:(newMenuitem=this.menuitemNodes.indexOf(menuitem),this.menuitemNodes[newMenuitem-1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusToNextMenuitem:function(menuitem){var newMenuitem=menuitem===this.lastMenuitem?this.firstMenuitem:(newMenuitem=this.menuitemNodes.indexOf(menuitem),this.menuitemNodes[newMenuitem+1]);return this.setFocusToMenuitem(newMenuitem),newMenuitem},setFocusByFirstCharacter:function(index,char){var start;1<char.length||(char=char.toLowerCase(),(start=this.menuitemNodes.indexOf(index)+1)>=this.menuitemNodes.length&&(start=0),-1===(index=this.firstChars.indexOf(char,start))&&(index=this.headingLevels.indexOf(char,start)),-1===index&&(index=this.firstChars.indexOf(char,0)),-1===index&&(index=this.headingLevels.indexOf(char,0)),-1<index&&this.setFocusToMenuitem(this.menuitemNodes[index]))},getIndexFirstChars:function(startIndex,char){for(var i=startIndex;i<this.firstChars.length;i+=1)if(char===this.firstChars[i])return i;return-1},openPopup:function(){this.createMenu(),this.menuNode.style.display="block",this.buttonNode.setAttribute("aria-expanded","true")},closePopup:function(){this.isOpen()&&(this.buttonNode.setAttribute("aria-expanded","false"),this.menuNode.style.display="none")},isOpen:function(){return"true"===this.buttonNode.getAttribute("aria-expanded")},handleFocusin:function(){this.domNode.classList.add("focus")},handleFocusout:function(){this.domNode.classList.remove("focus")},handleButtonKeydown:function(event){var flag=!1;switch(event.key){case" ":case"Enter":case"ArrowDown":case"Down":this.openPopup(),this.setFocusToFirstMenuitem(),flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.openPopup(),this.setFocusToLastMenuitem(),flag=!0}flag&&(event.stopPropagation(),event.preventDefault())},handleButtonClick:function(event){this.isOpen()?(this.closePopup(),this.buttonNode.focus()):(this.openPopup(),this.setFocusToFirstMenuitem()),event.stopPropagation(),event.preventDefault()},skipToElement:function(node){var inputNode=!1,isSearch=node.classList.contains("skip-to-search"),node=document.querySelector('[data-skip-to-id="'+node.getAttribute("data-id")+'"]');node&&(isSearch&&(inputNode=node.querySelector("input")),inputNode&&this.isVisible(inputNode)?inputNode.focus():(node.tabIndex=-1,node.focus(),node.scrollIntoView({block:"center"})))},handleMenuitemAction:function(tgt){var option;switch(tgt.getAttribute("data-id")){case"":break;case"skip-to-more-headings":option=tgt.getAttribute("data-show-heading-option"),this.updateHeadingGroupMenuitems(option);break;case"skip-to-more-landmarks":option=tgt.getAttribute("data-show-landmark-option"),this.updateLandmarksGroupMenuitems(option);break;default:this.closePopup(),this.skipToElement(tgt)}},handleMenuitemKeydown:function(event){var tgt=event.currentTarget,key=event.key,flag=!1;function isPrintableCharacter(str){return 1===str.length&&str.match(/\S/)}if(!(event.ctrlKey||event.altKey||event.metaKey)){if(event.shiftKey)isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0),"Tab"===event.key&&(this.buttonNode.focus(),this.closePopup(),flag=!0);else switch(key){case"Enter":case" ":this.handleMenuitemAction(tgt),flag=!0;break;case"Esc":case"Escape":this.closePopup(),this.buttonNode.focus(),flag=!0;break;case"Up":case"ArrowUp":this.setFocusToPreviousMenuitem(tgt),flag=!0;break;case"ArrowDown":case"Down":this.setFocusToNextMenuitem(tgt),flag=!0;break;case"Home":case"PageUp":this.setFocusToFirstMenuitem(),flag=!0;break;case"End":case"PageDown":this.setFocusToLastMenuitem(),flag=!0;break;case"Tab":this.closePopup();break;default:isPrintableCharacter(key)&&(this.setFocusByFirstCharacter(tgt,key),flag=!0)}flag&&(event.stopPropagation(),event.preventDefault())}},handleMenuitemClick:function(event){this.handleMenuitemAction(event.currentTarget),event.stopPropagation(),event.preventDefault()},handleMenuitemMouseover:function(event){event.currentTarget.focus()},handleBackgroundMousedown:function(event){this.domNode.contains(event.target)||this.isOpen()&&(this.closePopup(),this.buttonNode.focus())},normalizeName:function(name){return"string"==typeof name?name.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()}):""},getTextContent:function(elem){var str="Test",strings=[];return function getText(e,strings){if(e.nodeType===Node.TEXT_NODE)strings.push(e.data);else if(e.nodeType===Node.ELEMENT_NODE){var tagName=e.tagName.toLowerCase();if("img"===tagName||"area"===tagName)e.alt&&strings.push(e.alt);else for(var c=e.firstChild;c;)getText(c,strings),c=c.nextSibling}}(elem,strings),strings.length&&(str=strings.join(" ")),str},getAccessibleName:function(name){var labelledbyIds=name.getAttribute("aria-labelledby"),label=name.getAttribute("aria-label"),title=name.getAttribute("title"),name="";if(labelledbyIds&&labelledbyIds.length){var str,strings=[],ids=labelledbyIds.split(" ");ids.length||(ids=[labelledbyIds]);for(var i=0,l=ids.length;i<l;i+=1){var e=document.getElementById(ids[i]);e&&(str=this.getTextContent(e)),str.length&&strings.push(str)}name=strings.join(" ")}else label&&label.length?name=label:title&&title.length&&(name=title);return name},isVisible:function(element){return function isVisibleRec(el){if(9===el.nodeType)return!0;var hidden=window.getComputedStyle(el),display=hidden.getPropertyValue("display"),visibility=hidden.getPropertyValue("visibility"),hidden=el.getAttribute("hidden");return"none"!==display&&"hidden"!==visibility&&null===hidden&&isVisibleRec(el.parentNode)}(element)},getHeadings:function(targets){var dataId,level;"string"!=typeof targets&&(targets=this.config.headings);var headingElementsArr=[];if("string"==typeof targets&&0!==targets.length){for(var headings=document.querySelectorAll(targets),i=0,len=headings.length;i<len;i+=1){var heading=headings[i],headingItem=heading.getAttribute("role");"string"==typeof headingItem&&"presentation"===headingItem||this.isVisible(heading)&&(dataId=heading.hasAttribute("data-skip-to-id")?heading.getAttribute("data-skip-to-id"):(heading.setAttribute("data-skip-to-id",this.skipToIdIndex),this.skipToIdIndex),level=heading.tagName.substring(1),(headingItem={}).dataId=dataId.toString(),headingItem.class="heading",headingItem.name=this.getTextContent(heading),headingItem.ariaLabel=headingItem.name+", ",headingItem.ariaLabel+=this.config.headingLevelLabel+" "+level,headingItem.tagName=heading.tagName.toLowerCase(),headingItem.role="heading",headingItem.level=level,headingElementsArr.push(headingItem),this.skipToIdIndex+=1)}return headingElementsArr}},getLocalizedLandmarkName:function(tagName,name){var n;switch(tagName){case"aside":n=this.config.asideLabel;break;case"footer":n=this.config.footerLabel;break;case"form":n=this.config.formLabel;break;case"header":n=this.config.headerLabel;break;case"main":n=this.config.mainLabel;break;case"nav":n=this.config.navLabel;break;case"region":n=this.config.regionLabel;break;case"search":n=this.config.searchLabel;break;default:n=tagName}return this.isNotEmptyString(name)&&(n+=": "+name),n},getNestingLevel:function(landmark,landmarks){for(var nestingLevel=0,parentNode=landmark.parentNode;parentNode;){for(var i=0;i<landmarks.length;i+=1)if(landmarks[i]===parentNode&&3===(nestingLevel+=1))return 3;parentNode=parentNode.parentNode}return nestingLevel},getLandmarks:function(targets,allFlag){"boolean"!=typeof allFlag&&(allFlag=!1),"string"!=typeof targets&&(targets=this.config.landmarks);for(var landmarks=document.querySelectorAll(targets),mainElements=[],searchElements=[],navElements=[],asideElements=[],footerElements=[],regionElements=[],otherElements=[],allLandmarks=[],dataId="",i=0,len=landmarks.length;i<len;i+=1){var landmark=landmarks[i];if(landmark!==this.domNode){var role=landmark.getAttribute("role"),tagName=landmark.tagName.toLowerCase();if(("string"!=typeof role||"presentation"!==role)&&this.isVisible(landmark)){role=role||tagName;var name=this.getAccessibleName(landmark);switch("string"!=typeof name&&(name=""),role){case"banner":tagName="header";break;case"complementary":tagName="aside";break;case"contentinfo":tagName="footer";break;case"form":tagName="form";break;case"main":tagName="main";break;case"navigation":tagName="nav";break;case"section":tagName="region";break;case"search":tagName="search"}["aside","footer","form","header","main","nav","region","search"].indexOf(tagName)<0&&(tagName="main"),landmark.hasAttribute("aria-roledescription")&&(tagName=landmark.getAttribute("aria-roledescription")),dataId=landmark.hasAttribute("data-skip-to-id")?landmark.getAttribute("data-skip-to-id"):(landmark.setAttribute("data-skip-to-id",this.skipToIdIndex),this.skipToIdIndex);var landmarkItem={};switch(landmarkItem.dataId=dataId.toString(),landmarkItem.class="landmark",landmarkItem.name=this.getLocalizedLandmarkName(tagName,name),landmarkItem.tagName=tagName,landmarkItem.nestingLevel=0,allFlag&&(landmarkItem.nestingLevel=this.getNestingLevel(landmark,landmarks)),this.skipToIdIndex+=1,allLandmarks.push(landmarkItem),tagName){case"main":mainElements.push(landmarkItem);break;case"search":searchElements.push(landmarkItem);break;case"nav":navElements.push(landmarkItem);break;case"aside":asideElements.push(landmarkItem);break;case"footer":footerElements.push(landmarkItem);break;case"region":regionElements.push(landmarkItem);break;default:otherElements.push(landmarkItem)}}}}return allFlag?allLandmarks:[].concat(mainElements,regionElements,searchElements,navElements,asideElements,footerElements,otherElements)}};window.addEventListener("load",function(){SkipTo.init(window.SkipToConfig||window.Wordpress||{}),console.log("SkipTo loaded...")})}();
//# sourceMappingURL=skipto.min.js.map/*@end @*/