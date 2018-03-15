import { Component, OnInit, ViewChild , ElementRef, EventEmitter, Output} from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ListPicker } from "ui/list-picker";
import { Observable } from 'data/observable';
import { Page } from 'ui/page';
import { AnimationCurve } from "ui/enums";
import { FilterableListpicker } from 'nativescript-filterable-listpicker';
import * as frame from "tns-core-modules/ui/frame";
let MyModel;


@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent  extends Observable implements OnInit  {
    public count = 0;
    
    public hint = "please select ";
    public selection: string;
    private filterableListpicker: FilterableListpicker;

    constructor() {
        super();
        MyModel = this;
    }
    
    private languages = ["A# .NET","A# (Axiom)","A-0 System","A+","A++","ABAP","ABC","ABC ALGOL","ABSET","ABSYS","ACC","Accent","Ace DASL (Distributed Application Specification Language)","ACL2","ACT-III","Action!","ActionScript","Ada","Adenine","Agda","Agilent VEE","Agora","AIMMS","Aldor","Alef","ALF","ALGOL 58","ALGOL 60","ALGOL 68","ALGOL W","Alice","Alma-0","AmbientTalk","Amiga E","AMOS","AMPL","AngelScript","APL","App Inventor for Android's visual block language","AppleScript","APT","Arc","ARexx","Argus","AspectJ","Assembly language","ATS","Ateji PX","AutoHotkey","Autocoder","AutoIt","AutoLISP / Visual LISP","Averest","AWK","Axum","Active Server Pages","B","Babbage","Bash","BASIC","bc","BCPL","BeanShell","Batch (Windows/Dos)","Bertrand","BETA","Bistro","BLISS","Blockly","BlooP","Boo","Boomerang","BPEL","Business Basic","C","C--","C/AL","Caché ObjectScript","C Shell (csh)","Caml","Cayenne","CDuce","Cecil","Cesil","Céu","Ceylon","CFEngine","CFML","Cg","Ch","Chapel","Charity","Charm","CHILL","CHIP-8","chomski","ChucK","Cilk","Citrine","Claire","Clarion","Clean","Clipper","CLIPS","CLIST","Clojure","CLU","CMS-2","Cobra","CODE","CoffeeScript","ColdFusion","COMAL","COMIT","COMPASS","Component Pascal","COMTRAN","Converge","Cool","Coq","Coral 66","CorVision","COWSEL","CPL","Cryptol","Crystal","Csound","CSP","CUDA","Curl","Curry","Cybil","Cyclone","Cython","Dart","DataFlex","Datalog","DATATRIEVE","dBase","dc","DCL","Delphi","DinkC","DIBOL","Dog","Draco","DRAKON","Dylan","DYNAMO","Ease","Easy PL/I","EASYTRIEVE PLUS","ECMAScript","Edinburgh IMP","EGL","Eiffel","ELAN","Elixir","Elm","Emacs Lisp","Emerald","Epigram","EPL (Easy Programming Language)","Erlang","es","Escher","ESPOL","Esterel","Etoys","Euclid","Euler","Euphoria","EusLisp Robot Programming Language","EXEC 2","Executable UML","F#","F*","Factor","Falcon","Fantom","FAUST","FFP","Fjölnir","FL","Flavors","Flex","FlooP","FLOW-MATIC","FOCAL","FOCUS","FOIL","FORMAC","@Formula","Forth","Fortress","FoxBase","FoxPro","FP","Franz Lisp","Frege","F-Script","Game Maker Language","GameMonkey Script","GAMS","GAP","G-code","GDScript","Genie","GDL","GJ","GEORGE","GLSL","GNU E","GM","Go","Go!","GOAL","Gödel","Golo","GOM (Good Old Mad)","Google Apps Script","Gosu","GOTRAN","GPSS","GraphTalk","GRASS","Groovy","Hack","HAGGIS","HAL/S","Halide (programming language)","Hamilton C shell","Harbour","Hartmann pipelines","Haskell","Haxe","Hermes","High Level Assembly","HLSL","Hop","Hopscotch","Hope","Hugo","Hume","HyperTalk","IBM Basic assembly language","IBM HAScript","IBM Informix-4GL","IBM RPG","ICI","Icon","Id","IDL","Idris","IMP","Inform","INTERLISP","Io","Ioke","IPL","IPTSCRAE","ISLISP","ISPF","ISWIM","J#","J++","JADE","JAL","Janus (concurrent constraint programming language)","Janus (time-reversible computing programming language)","JASS","Java","JavaScript","JCL","JEAN","Join Java","JOSS","Joule","JOVIAL","Joy","JScript","JScript .NET","JavaFX Script","Julia","Jython","Kaleidoscope","Karel","Karel++","KEE","Kixtart","Klerer-May System","KIF","Kojo","Kotlin","KRC","KRL","KRYPTON","ksh","Kodu","LabVIEW","Ladder","Lagoona","LANSA","Lasso","LaTeX","Lava","LC-3","Leda","Legoscript","LIL","LilyPond","Limbo","Limnor","LINC","Lingo","LIS","LISA","Lisaac","Lite-C","Lithe","Little b","Logo","Logtalk","LotusScript","LPC","LSE","LSL","LiveCode","LiveScript","Lua","Lucid","Lustre","LYaPAS","Lynx","M2001","M4","M#","Machine code","MAD/I","Magik","Magma","make","Maude system","Maple","Mary","MASM Microsoft Assembly x86","MATH-MATIC","Mathematica","MATLAB","Maya (MEL)","MDL","Mercury","Mesa","Metafont","MetaQuotes Language (MQL4/MQL5)","MHEG-5 (Interactive TV programming language)","Microcode","MicroScript","MIIS","Milk (programming language)","MIMIC","Mirah","Miranda","MIVA Script","ML","Model 204","Modelica","Modula","Modula-2","Modula-3","Mohol","MOO","Mortran","Mouse","MPD","Mathcad","IL","MSL","MUMPS","MuPAD","NASM","Napier88","Neko","Nemerle","nesC","NESL","Net.Data","NetLogo","NetRexx","NewLISP","NEWP","Newspeak","NewtonScript","NGL","Nial","Nice","Nim","NPL","NSIS","Nu","NWScript","NXT-G","o:XML","Oak","Oberon","OBJ2","Object Lisp","ObjectLOGO","Object REXX","Object Pascal","Objective-C","Objective-J","Obliq","OCaml","occam","occam-π","Octave","OmniMark","Onyx","Opa","Opal","OpenCL","OpenEdge ABL","OPL","OpenVera","OPS5","OptimJ","Orc","ORCA/Modula-2","Oriel","Orwell","Oxygene","Oz","P","P#","ParaSail (programming language)","PARI/GP","","PCASTL","PCF","PEARL","PeopleCode","Perl","PDL","Perl 6","Pharo","PHP","Pico","Picolisp","Pict","Pike","PIKT","PILOT","Pipelines","Pizza","PL-11","PL/0","PL/B","PL/C","PL/M","PL/P","PL/SQL","PL360","PLANC","Plankalkül","Planner","PLEX","PLEXIL","Plus","POP-11","POP-2","PostScript","PortablE","Powerhouse","PowerShell","PPL","Processing","Processing.js","Prograph","PROIV","Prolog","PROMAL","Promela","PROSE modeling language","PROTEL","ProvideX","Pro*C","Pure","Pure Data","Python","Q (equational programming language)","Q (programming language from Kx Systems)","Qalb","QBasic","QtScript","QuakeC","QPL","R++","Racket","RAPID","Rapira","Ratfiv","Ratfor","rc","REBOL","Red","Redcode","REFAL","Reia","REXX","Ring","Rlab","ROOP","RPG","RPL","RSL","RTL/2","Ruby","RuneScript","Rust","S2","S3","S-Lang","S-PLUS","SA-C","SabreTalk","SAIL","SALSA","SAM76","SAS","SASL","Sather","Sawzall","SBL","Scala","Scheme","Scilab","Scratch","Script.NET","Sed","Seed7","Self","SenseTalk","SequenceL","SETL","SIMPOL","SIGNAL","SiMPLE","SIMSCRIPT","Simula","Simulink","Singularity","SISAL","SLIP","SMALL","Smalltalk","Small Basic","SML","Strongtalk","Snap!","Snowball","SOL","Solidity","SPARK","Speedcode","SPIN","SP/k","SPS","SQR","Squeak","Squirrel","SR","S/SL","Stackless Python","Starlogo","Strand","Stata","Stateflow","Subtext","SuperCollider","SuperTalk","Swift (Apple programming language)","Swift (parallel scripting language)","SYMPL","SyncCharts","SystemVerilo","TACL","TACPOL","TADS","TAL","Tcl","Tea","TECO","TELCOMP","TeX","TEX","TIE","Timber","Tom","TOM","Toi","Topspeed","TPU","Trac","TTM","T-SQL","Transcript","TTCN","Turing","TUTOR","TXL","TypeScript","Ubercode","UCSD Pascal","Umple","Unicon","Uniface","UNITY","Unix shell","UnrealScript","Vala","Verilog","VHDL","Visual Basic","Visual Basic .NET","Visual DataFlex","Visual DialogScript","Visual Fortran","Visual FoxPro","Visual J++","Visual J#","Visual Objects","Visual Prolog","VSXu","vvvv","WATFIV, WATFOR","WebDNA","WebQL","Whiley","Windows PowerShell","Winbatch","Wolfram Language","Wyvern","X10","XBL","xHarbour","XL","Xojo","XOTcl","XPL","XPL0","XQuery","XSB","XSharp","ath","Xtend","X++","Yorick","YQL","Yoix","Z notation","Zeno","ZOPL","Zsh","ZPL"];
    private objArray = [
        {
            "image": "https://lh3.googleusercontent.com/gN6iBKP1b2GTXZZoCxhyXiYIAh8QJ_8xzlhEK6csyDadA4GdkEdIEy9Bc8s5jozt1g=w300",
            "title": "Brown Bear",
            "description": "Brown bear brown bear, what do you see?"
        },
        {
            "image": "http://icons.veryicon.com/png/Flag/Rounded%20World%20Flags/Indonesia%20Flag.png",
            "title": "Red Bird"
        },
        {
            "title": "Purple Cat",
            "description": "Why are we teaching kids there are purple cats?"
        },
        {
            "image": "https://lh3.googleusercontent.com/UMB2HRRRAAzXAEaCM9Gg-baCaDx_1RTXHscW5k2Ge3P4KP4mwTt2m6oyEHBWex3c4SxU=w300",
            "title": "Blue Horse",
            "description": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it."
        },
        {
            "image": "https://cdn.iconscout.com/public/images/icon/free/png-512/frog-face-animal-aquatic-3272656142b1b3cb-512x512.png",
            "title": "Green Frog",
            "description": "Cortado, cappuccino, espresso."
        },
        {
            "image": "https://marketplace.canva.com/MAB60kWLDdM/1/thumbnail/canva-cute-dog-icon-MAB60kWLDdM.png",
            "title": "White Dog",
        },
        {
            "title": "Yellow Snake",
        },
        {
            "image": "http://icons.iconarchive.com/icons/aha-soft/desktop-halloween/256/Hat-icon.png",
            "title": "Black Witch",
            "description": "Peter piper picked a peck of pickled peppers."
        },
    ];
    public listitems = this.objArray;
    // public itemTapped(args) {
    //     console.dir(args.selectedItem);
    //     MyModel.set('selection', args.selectedItem);
    //     if (typeof args.selectedItem == 'string') {
    //         MyModel.set('selection', args.selectedItem);
    //     } else {
    //         MyModel.set('selection', args.selectedItem.title);
    //     }
    // }
    // public showingCreateTicket: any = false;
    // public loadingTicketFields: boolean = false;

    // public showingLongListPicker: any = false;
    // public unfilteredItemsToShow = [];
    // public itemsToShow = [];

    // public selectedProduct = '';
    // public productMap = {};
    // public listProducts = [];

    // public filterItem: string;

    // @Output() outputEvent: EventEmitter<any> = new EventEmitter();
    // @ViewChild("longListPickerContainer") longListPickerContainer: ElementRef;
    // @ViewChild("longListPickerDimmer") longListPickerDimmer: ElementRef;

    // show() {
    //     this.loadingTicketFields = true;
    //     // this.supportService.getTicketFields().subscribe(result => {
    //     //     console.dir(result);
    //     //     result.ticket_fields.forEach(field => {
    //     //         if (field.title == 'Product') {
    //     //             field.custom_field_options.forEach(prod => {
    //     //                 let prodParts = prod.name.split('::');
    //     //                 this.productMap[prodParts[prodParts.length-1]] = prod;
    //     //                 this.listProducts.push(prodParts[prodParts.length-1])
    //     //             })
    //     //             this.listProducts.sort();
    //     //         }
    //     //     })
    //     //     this.loadingTicketFields = false;
    //     // })
    //     this.showingCreateTicket = true
    // }

    // showProducts() {
    //     this.animateLongListPicker('products');
    //     this.itemsToShow = this.listProducts;
    //     this.unfilteredItemsToShow = this.listProducts;
    // }

    // filterLongList() {
    //     this.itemsToShow = this.unfilteredItemsToShow.filter(item => {
    //         return item.toLowerCase().indexOf(this.filterItem.toLowerCase()) !== -1;
    //     });
    // }

    // animateLongListPicker(type) {
    //     this.showingLongListPicker = type;
    //     this.longListPickerDimmer.nativeElement.opacity = 0;
    //     this.longListPickerDimmer.nativeElement.animate({
    //         opacity: 1,
    //         duration: 200
    //     })
    //     this.longListPickerContainer.nativeElement.opacity = 1;
    //     this.longListPickerContainer.nativeElement.scaleX = .7;
    //     this.longListPickerContainer.nativeElement.scaleY = .7;
    //     this.longListPickerContainer.nativeElement.animate({
    //         opacity: 1,
    //         scale: {x: 1, y: 1},
    //         duration: 400,
    //         curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
    //     })
    // }

    // chooseLongList(event) {
    //     this.filterItem = '';
    //     if (this.showingLongListPicker == 'products') {
    //         this.selectedProduct = this.itemsToShow[event.index];
    //     }
    //     this.closeLongListPicker();
    // }

    // closeLongListPicker() {
    //     this.longListPickerDimmer.nativeElement.animate({
    //         opacity: 0,
    //         duration: 200
    //     })
    //     this.longListPickerContainer.nativeElement.animate({
    //         opacity: 0,
    //         scale: {x: .7, y: .7},
    //         duration: 300,
    //         curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
    //     }).then(() => {
    //         this.showingLongListPicker = false;
    //     })
    // }

    // doneCreateTicket() {
    //     this.closeCreateTicket();
    //     this.outputEvent.emit('create ticket finished');
    // }

    // closeCreateTicket() {
    //     this.showingCreateTicket = false;
    // }

    @ViewChild('myfilter') myfilter: ElementRef;

    cancelFilterableList() {
        console.log('canceled');
    }

    itemTapped(args) {
      console.dir(args.selectedItem);
          MyModel.set('selection', args.selectedItem);
          if (typeof args.selectedItem == 'string') {
              MyModel.set('selection', args.selectedItem);
          } else {
              MyModel.set('selection', args.selectedItem.title);
          }

    }

    showPicker() {
        this.set('listitems', this.languages);
        this.myfilter.nativeElement.show();
    }
    showNewThings() {
        this.set('listitems', this.objArray);
        this.myfilter.nativeElement.show();
    }
        // public get countries(): any[] {
        //   return this._countries;
        // }
      
        // public set countries(value: any[]) {
        //   this._countries = value;
        // }
        // public selected = [{ "name": "Jordan", "code": "JO" }];
      
        // public item_template = `
        // <GridLayout class="item" columns="100,*,100"> 
        // <IC:WebImage xmlns:IC="nativescript-web-image-cache" width="90" height="60" stretch="fill" row="0"
        //            col="0"  id="my-image-1" placeholder="~/icon.png" 
        //            src="{{ flags(code) }}">
        //            </IC:WebImage>
        // <Label col="1" class="text-center" text="{{ name }}" textWrap="true" /> 
        // <Label col="2" class="text-center" text="{{ code }}" textWrap="true" /> 
        // </GridLayout>
        // `;
      
        // public onSelect(args) {
        //   console.log('selected array is => ' + JSON.stringify(args.selected));
        // }
      
        // constructor() {
        //   super();
        // //   FileReader.readJSON('countries.json').then((data: any) => {
        // //     this.countries = data;
        // //     this.Refresh('countries');
        // //   });
        // this.countries = [ 
        //     {"name": "Afghanistan", "code": "AF"}, 
        //     {"name": "Åland Islands", "code": "AX"}, 
        //     {"name": "Albania", "code": "AL"}, 
        //     {"name": "Algeria", "code": "DZ"}, 
        //     {"name": "American Samoa", "code": "AS"}, 
        //     {"name": "AndorrA", "code": "AD"}, 
        //     {"name": "Angola", "code": "AO"}, 
        //     {"name": "Anguilla", "code": "AI"}, 
        //     {"name": "Antarctica", "code": "AQ"}, 
        //     {"name": "Antigua and Barbuda", "code": "AG"}, 
        //     {"name": "Argentina", "code": "AR"}, 
        //     {"name": "Armenia", "code": "AM"}, 
        //     {"name": "Aruba", "code": "AW"}, 
        //     {"name": "Australia", "code": "AU"}, 
        //     {"name": "Austria", "code": "AT"}, 
        //     {"name": "Azerbaijan", "code": "AZ"}, 
        //     {"name": "Bahamas", "code": "BS"}, 
        //     {"name": "Bahrain", "code": "BH"}, 
        //     {"name": "Bangladesh", "code": "BD"}, 
        //     {"name": "Barbados", "code": "BB"}, 
        //     {"name": "Belarus", "code": "BY"}, 
        //     {"name": "Belgium", "code": "BE"}, 
        //     {"name": "Belize", "code": "BZ"}, 
        //     {"name": "Benin", "code": "BJ"}, 
        //     {"name": "Bermuda", "code": "BM"}, 
        //     {"name": "Bhutan", "code": "BT"}
        // ];
      
        // this.Refresh('countries');

        // }
        // public init(page: Page) {
        //   let refreshLabel = page.getViewById('refreshLabel');
        //   this.changeText(refreshLabel);
        // }
        // public changeText(refreshLabel) {
        //   let self = this;
        //   console.log("please select => " + self.count);
        //   setInterval(function () {
        //     self.hint = "please select => " + self.count
        //     self.count = self.count + 1;
        //     self.Refresh('hint');
        //     console.log(self.hint);
        //     refreshLabel.refresh();
        //   }, 1000);
      
        // }
      
        // public Refresh(key = null) {
        //   var self = this;
        //   this.notify({
        //     object: self,
        //     eventName: Observable.propertyChangeEvent,
        //     propertyName: key,
        //     value: self[key]
        //   });
      
      
        // }
    // public pokemons: Array<string>;
    // public index: number;
    
    // constructor() {
    //     this.pokemons = [];

    //     for (let i = 0; i < pokemonList.length; i++) {
    //         this.pokemons.push(pokemonList[i]);
    //     }
    // }

    // public selectedIndexChanged(args) {
    //     let picker = <ListPicker>args.object;
    //     console.log("picker selection: " + picker.selectedIndex);
    // }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;


    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
