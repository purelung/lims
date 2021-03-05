/*! For license information please see 20.9dcd1706.chunk.js.LICENSE.txt */
(this["webpackJsonpappstack-react"]=this["webpackJsonpappstack-react"]||[]).push([[20],{1016:function(t,e){!function(t,e,s){"use strict";var n={selected:0,keyNavigation:!0,autoAdjustHeight:!0,cycleSteps:!1,backButtonSupport:!0,useURLhash:!0,showStepURLhash:!0,lang:{next:"Next",previous:"Previous"},toolbarSettings:{toolbarPosition:"bottom",toolbarButtonPosition:"end",showNextButton:!0,showPreviousButton:!0,toolbarExtraButtons:[]},anchorSettings:{anchorClickable:!0,enableAllAnchors:!1,markDoneStep:!0,markAllPreviousStepsAsDone:!0,removeDoneStepOnNavigateBack:!1,enableAnchorOnDoneStep:!0},contentURL:null,contentCache:!0,ajaxSettings:{},disabledSteps:[],errorSteps:[],hiddenSteps:[],theme:"default",transitionEffect:"none",transitionSpeed:"400"};function i(e,s){this.options=t.extend(!0,{},n,s),this.main=t(e),this.nav=this.main.children("ul"),this.steps=t("li > a",this.nav),this.container=this.main.children("div"),this.pages=this.container.children("div"),this.current_index=null,this.options.toolbarSettings.toolbarButtonPosition="right"===this.options.toolbarSettings.toolbarButtonPosition?"end":this.options.toolbarSettings.toolbarButtonPosition,this.options.toolbarSettings.toolbarButtonPosition="left"===this.options.toolbarSettings.toolbarButtonPosition?"start":this.options.toolbarSettings.toolbarButtonPosition,this.options.theme=null===this.options.theme||""===this.options.theme?"default":this.options.theme,this.init()}t.extend(i.prototype,{init:function(){this._setElements(),this._setToolbar(),this._setEvents();var s=this.options.selected;if(this.options.useURLhash){var n=e.location.hash;if(n&&0<n.length){var i=t("a[href*='"+n+"']",this.nav);if(0<i.length){var o=this.steps.index(i);s=0<=o?o:s}}}0<s&&this.options.anchorSettings.markDoneStep&&this.options.anchorSettings.markAllPreviousStepsAsDone&&this.steps.eq(s).parent("li").prevAll().addClass("done"),this._showStep(s)},_setElements:function(){this.main.addClass("sw-main sw-theme-"+this.options.theme),this.nav.addClass("nav nav-tabs step-anchor").children("li").addClass("nav-item").children("a").addClass("nav-link"),!1!==this.options.anchorSettings.enableAllAnchors&&!1!==this.options.anchorSettings.anchorClickable&&this.steps.parent("li").addClass("clickable"),this.container.addClass("sw-container tab-content"),this.pages.addClass("tab-pane step-content");var e=this;return this.options.disabledSteps&&0<this.options.disabledSteps.length&&t.each(this.options.disabledSteps,(function(t,s){e.steps.eq(s).parent("li").addClass("disabled")})),this.options.errorSteps&&0<this.options.errorSteps.length&&t.each(this.options.errorSteps,(function(t,s){e.steps.eq(s).parent("li").addClass("danger")})),this.options.hiddenSteps&&0<this.options.hiddenSteps.length&&t.each(this.options.hiddenSteps,(function(t,s){e.steps.eq(s).parent("li").addClass("hidden")})),!0},_setToolbar:function(){if("none"===this.options.toolbarSettings.toolbarPosition)return!0;var e,s,n=!1!==this.options.toolbarSettings.showNextButton?t("<button></button>").text(this.options.lang.next).addClass("btn btn-secondary sw-btn-next").attr("type","button"):null,i=!1!==this.options.toolbarSettings.showPreviousButton?t("<button></button>").text(this.options.lang.previous).addClass("btn btn-secondary sw-btn-prev").attr("type","button"):null,o=t("<div></div>").addClass("btn-group mr-2 sw-btn-group").attr("role","group").append(i,n),a=null;switch(this.options.toolbarSettings.toolbarExtraButtons&&0<this.options.toolbarSettings.toolbarExtraButtons.length&&(a=t("<div></div>").addClass("btn-group mr-2 sw-btn-group-extra").attr("role","group"),t.each(this.options.toolbarSettings.toolbarExtraButtons,(function(t,e){a.append(e.clone(!0))}))),this.options.toolbarSettings.toolbarPosition){case"top":(e=t("<div></div>").addClass("btn-toolbar sw-toolbar sw-toolbar-top justify-content-"+this.options.toolbarSettings.toolbarButtonPosition)).append(o),"start"===this.options.toolbarSettings.toolbarButtonPosition?e.prepend(a):e.append(a),this.container.before(e);break;case"bottom":(s=t("<div></div>").addClass("btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-"+this.options.toolbarSettings.toolbarButtonPosition)).append(o),"start"===this.options.toolbarSettings.toolbarButtonPosition?s.prepend(a):s.append(a),this.container.after(s);break;case"both":(e=t("<div></div>").addClass("btn-toolbar sw-toolbar sw-toolbar-top justify-content-"+this.options.toolbarSettings.toolbarButtonPosition)).append(o),"start"===this.options.toolbarSettings.toolbarButtonPosition?e.prepend(a):e.append(a),this.container.before(e),(s=t("<div></div>").addClass("btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-"+this.options.toolbarSettings.toolbarButtonPosition)).append(o.clone(!0)),null!==a&&("start"===this.options.toolbarSettings.toolbarButtonPosition?s.prepend(a.clone(!0)):s.append(a.clone(!0))),this.container.after(s);break;default:(s=t("<div></div>").addClass("btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-"+this.options.toolbarSettings.toolbarButtonPosition)).append(o),this.options.toolbarSettings.toolbarButtonPosition,s.append(a),this.container.after(s)}return!0},_setEvents:function(){var n=this;return t(this.steps).on("click",(function(t){if(t.preventDefault(),!1===n.options.anchorSettings.anchorClickable)return!0;var e=n.steps.index(this);if(!1===n.options.anchorSettings.enableAnchorOnDoneStep&&n.steps.eq(e).parent("li").hasClass("done"))return!0;e!==n.current_index&&(!1!==n.options.anchorSettings.enableAllAnchors&&!1!==n.options.anchorSettings.anchorClickable||n.steps.eq(e).parent("li").hasClass("done"))&&n._showStep(e)})),t(".sw-btn-next",this.main).on("click",(function(t){t.preventDefault(),n._showNext()})),t(".sw-btn-prev",this.main).on("click",(function(t){t.preventDefault(),n._showPrevious()})),this.options.keyNavigation&&t(s).keyup((function(t){n._keyNav(t)})),this.options.backButtonSupport&&t(e).on("hashchange",(function(s){if(!n.options.useURLhash)return!0;if(e.location.hash){var i=t("a[href*='"+e.location.hash+"']",n.nav);i&&0<i.length&&(s.preventDefault(),n._showStep(n.steps.index(i)))}})),!0},_showNext:function(){for(var t=this.current_index+1,e=t;e<this.steps.length;e++)if(!this.steps.eq(e).parent("li").hasClass("disabled")&&!this.steps.eq(e).parent("li").hasClass("hidden")){t=e;break}if(this.steps.length<=t){if(!this.options.cycleSteps)return!1;t=0}return this._showStep(t),!0},_showPrevious:function(){for(var t=this.current_index-1,e=t;0<=e;e--)if(!this.steps.eq(e).parent("li").hasClass("disabled")&&!this.steps.eq(e).parent("li").hasClass("hidden")){t=e;break}if(t<0){if(!this.options.cycleSteps)return!1;t=this.steps.length-1}return this._showStep(t),!0},_showStep:function(t){return!!this.steps.eq(t)&&t!=this.current_index&&!this.steps.eq(t).parent("li").hasClass("disabled")&&!this.steps.eq(t).parent("li").hasClass("hidden")&&(this._loadStepContent(t),!0)},_loadStepContent:function(e){var s=this,n=this.steps.eq(this.current_index),i="",o=this.steps.eq(e),a=o.data("content-url")&&0<o.data("content-url").length?o.data("content-url"):this.options.contentURL;if(null!==this.current_index&&this.current_index!==e&&(i=this.current_index<e?"forward":"backward"),null!==this.current_index&&!1===this._triggerEvent("leaveStep",[n,this.current_index,i]))return!1;if(!(a&&0<a.length)||o.data("has-content")&&this.options.contentCache)this._transitPage(e);else{var r=0<o.length?t(o.attr("href"),this.main):null,l=t.extend(!0,{},{url:a,type:"POST",data:{step_number:e},dataType:"text",beforeSend:function(){s._loader("show")},error:function(e,n,i){s._loader("hide"),t.error(i)},success:function(t){t&&0<t.length&&(o.data("has-content",!0),r.html(t)),s._loader("hide"),s._transitPage(e)}},this.options.ajaxSettings);t.ajax(l)}return!0},_transitPage:function(e){var s=this,n=this.steps.eq(this.current_index),i=0<n.length?t(n.attr("href"),this.main):null,o=this.steps.eq(e),a=0<o.length?t(o.attr("href"),this.main):null,r="";null!==this.current_index&&this.current_index!==e&&(r=this.current_index<e?"forward":"backward");var l="middle";return 0===e?l="first":e===this.steps.length-1&&(l="final"),this.options.transitionEffect=this.options.transitionEffect.toLowerCase(),this.pages.finish(),"slide"===this.options.transitionEffect?i&&0<i.length?i.slideUp("fast",this.options.transitionEasing,(function(){a.slideDown(s.options.transitionSpeed,s.options.transitionEasing)})):a.slideDown(this.options.transitionSpeed,this.options.transitionEasing):"fade"===this.options.transitionEffect?i&&0<i.length?i.fadeOut("fast",this.options.transitionEasing,(function(){a.fadeIn("fast",s.options.transitionEasing,(function(){t(this).show()}))})):a.fadeIn(this.options.transitionSpeed,this.options.transitionEasing,(function(){t(this).show()})):(i&&0<i.length&&i.hide(),a.show()),this._setURLHash(o.attr("href")),this._setAnchor(e),this._setButtons(e),this._fixHeight(e),this.current_index=e,this._triggerEvent("showStep",[o,this.current_index,r,l]),!0},_setAnchor:function(t){return this.steps.eq(this.current_index).parent("li").removeClass("active"),!1!==this.options.anchorSettings.markDoneStep&&null!==this.current_index&&(this.steps.eq(this.current_index).parent("li").addClass("done"),!1!==this.options.anchorSettings.removeDoneStepOnNavigateBack&&this.steps.eq(t).parent("li").nextAll().removeClass("done")),this.steps.eq(t).parent("li").removeClass("done").addClass("active"),!0},_setButtons:function(e){return this.options.cycleSteps||(e<=0?t(".sw-btn-prev",this.main).addClass("disabled"):t(".sw-btn-prev",this.main).removeClass("disabled"),this.steps.length-1<=e?t(".sw-btn-next",this.main).addClass("disabled"):t(".sw-btn-next",this.main).removeClass("disabled")),!0},_keyNav:function(t){switch(t.which){case 37:this._showPrevious(),t.preventDefault();break;case 39:this._showNext(),t.preventDefault();break;default:return}},_fixHeight:function(e){if(this.options.autoAdjustHeight){var s=0<this.steps.eq(e).length?t(this.steps.eq(e).attr("href"),this.main):null;this.container.finish().animate({minHeight:s.outerHeight()},this.options.transitionSpeed,(function(){}))}return!0},_triggerEvent:function(e,s){var n=t.Event(e);return this.main.trigger(n,s),!n.isDefaultPrevented()&&n.result},_setURLHash:function(t){this.options.showStepURLhash&&e.location.hash!==t&&(e.location.hash=t)},_loader:function(t){switch(t){case"show":this.main.addClass("sw-loading");break;case"hide":this.main.removeClass("sw-loading");break;default:this.main.toggleClass("sw-loading")}},goToStep:function(t){this._transitPage(t)},hiddenSteps:function(e){if(this.options.hiddenSteps=e,this.options.hiddenSteps&&0<this.options.hiddenSteps.length){var s=this;t.each(s.steps,(function(e,n){-1<t.inArray(e,s.options.hiddenSteps)?t(n).parent("li").addClass("hidden"):t(n).parent("li").removeClass("hidden")}))}},theme:function(t){if(this.options.theme===t)return!1;this.main.removeClass("sw-theme-"+this.options.theme),this.options.theme=t,this.main.addClass("sw-theme-"+this.options.theme),this._triggerEvent("themeChanged",[this.options.theme])},next:function(){this._showNext()},prev:function(){this._showPrevious()},reset:function(){if(!1===this._triggerEvent("beginReset"))return!1;this.container.stop(!0),this.pages.stop(!0),this.pages.hide(),this.current_index=null,this._setURLHash(this.steps.eq(this.options.selected).attr("href")),t(".sw-toolbar",this.main).remove(),this.steps.removeClass(),this.steps.parents("li").removeClass(),this.steps.data("has-content",!1),this.init(),this._triggerEvent("endReset")},stepState:function(e,s){e=t.isArray(e)?e:[e];var n=t.grep(this.steps,(function(s,n){return-1!==t.inArray(n,e)}));if(n&&0<n.length)switch(s){case"disable":t(n).parents("li").addClass("disabled");break;case"enable":t(n).parents("li").removeClass("disabled");break;case"hide":t(n).parents("li").addClass("hidden");break;case"show":t(n).parents("li").removeClass("hidden");break;case"error-on":t(n).parents("li").addClass("danger");break;case"error-off":t(n).parents("li").removeClass("danger")}}}),t.fn.smartWizard=function(e){var s,n=arguments;return void 0===e||"object"==typeof e?this.each((function(){t.data(this,"smartWizard")||t.data(this,"smartWizard",new i(this,e))})):"string"==typeof e&&"_"!==e[0]&&"init"!==e?(s=t.data(this[0],"smartWizard"),"destroy"===e&&t.data(this,"smartWizard",null),s instanceof i&&"function"==typeof s[e]?s[e].apply(s,Array.prototype.slice.call(n,1)):this):void 0}}(jQuery,window,document)},1125:function(t,e,s){"use strict";s.r(e);var n=s(14),i=s(17),o=s(16),a=s(15),r=s(0),l=s.n(r),h=s(698),p=s(699),d=s(706),c=s(785),u=s.n(c),b=u.a;window.jQuery=u.a,s(1016);var f=function(t){Object(o.a)(s,t);var e=Object(a.a)(s);function s(){var t;Object(n.a)(this,s);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(t=e.call.apply(e,[this].concat(o))).render=function(){var e=t.props.color;return l.a.createElement("div",{ref:"smartwizard",className:"wizard wizard-".concat(e," mb-4")},l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("a",{href:"#step-1"},"First Step",l.a.createElement("br",null),l.a.createElement("small",null,"Step description"))),l.a.createElement("li",null,l.a.createElement("a",{href:"#step-2"},"Second Step",l.a.createElement("br",null),l.a.createElement("small",null,"Step description"))),l.a.createElement("li",null,l.a.createElement("a",{href:"#step-3"},"Third Step",l.a.createElement("br",null),l.a.createElement("small",null,"Step description"))),l.a.createElement("li",null,l.a.createElement("a",{href:"#step-4"},"Fourth Step",l.a.createElement("br",null),l.a.createElement("small",null,"Step description")))),l.a.createElement("div",null,l.a.createElement("div",{id:"step-1"},"Step Content 1"),l.a.createElement("div",{id:"step-2"},"Step Content 2"),l.a.createElement("div",{id:"step-3"},"Step Content 3"),l.a.createElement("div",{id:"step-4"},"Step Content 4")))},t}return Object(i.a)(s,[{key:"componentDidMount",value:function(){b(this.refs.smartwizard).smartWizard({theme:this.props.variant,showStepURLhash:!1,toolbarSettings:{toolbarExtraButtons:[b('<button class="btn btn-submit btn-primary" type="button">Finish</button>')]}}).on("leaveStep",(function(t,e,s,n){return!0})),b(this.refs.smartwizard).find(".btn-submit").on("click",(function(){return alert("Great! The form is ready to submit."),!1}))}}]),s}(l.a.Component);e.default=function(){return l.a.createElement(h.a,{fluid:!0,className:"p-0"},l.a.createElement("h1",{className:"h3 mb-3"},"Wizard"),l.a.createElement(p.a,null,l.a.createElement(d.a,{lg:"6"},l.a.createElement(f,{variant:"default",color:"primary"}),l.a.createElement(f,{variant:"default",color:"success"}),l.a.createElement(f,{variant:"default",color:"danger"})),l.a.createElement(d.a,{lg:"6"},l.a.createElement(f,{variant:"arrows",color:"primary"}),l.a.createElement(f,{variant:"arrows",color:"success"}),l.a.createElement(f,{variant:"arrows",color:"danger"}))))}}}]);
//# sourceMappingURL=20.9dcd1706.chunk.js.map