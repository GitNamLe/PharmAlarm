
export class MongoService { 
    recent = [
        {
            name:"ambien",
            date:"8:40",
            log:"1/1"
        },{
            name:"aspirin",
            date:"8:21",
            log:"5/6"
        },{
            name:"advil",
            date:"8:01",
            log:"2/6"
        },{
            name:"zyrtec",
            date:"7:39",
            log:"1/1"
        },{
            name:"benadryl",
            date:"7:20",
            log:"2/6"
        },{
            name:"advil",
            date:"6:23",
            log:"1/6"
        }
    ];
    cabinet = [
        {
            name:"advil",
            dosage:"200mg",
            limit:6,
            taken:4,
            directions:"Take 1 to 2 tablets every 6 hours",
            desc:"It can treat minor aches\nand pains, and reduces fever.",
        }, {
            name:"ambien",
            dosage:"10mg",
            limit:1,
            taken:1,
            directions:"One tablet before bed",
            desc:"Treats anxiety and\npanic disorder."
        }, {
            name: 'zyrtec',
            dosage: "10mg",
            limit: 1,
            taken: 1,
            directions:"Do not take more than one 10 mg tablet in 24 hours",
            desc:"It can treat hay fever and allergy\nsymptoms, hives, and itching"
        }, {
            name: 'aspirin',
            dosage:"325mg",
            limit: 6,
            taken: 5,
            directions:"1 or 2 every 4 hours. Do not exceed 12.",
            desc:"Treats pain, fever, headache, and inflammation.\nIt can also reduce the risk of heart attack"
        }, {
            name: 'benadryl',
            dosage:"25mg",
            limit: 6,
            taken: 2,
            directions:"Take two tablets every 4 to 6 hours.",
            desc:"Treats hay fever, allergies,\ncold symptoms, and insomnia."
        },
    ];
    library = [
        {
            advil: {
                dosage: "200mg",
                limit: 6,
                directions: "Take 1 to 2 tablets every 6 hours"
            },
            desc: "For temporary relief of fever,\nminor aches, and pains"
        },
        {
            xanax:true,
            desc:"Manages symptoms of anxiety\nand treats panic disorder."
        },
        {
            prozac: true,
            desc: "treat depression, obsessive-compulsive\ndisorder (OCD), bulimia nervosa, and panic disorder"
        },
        {
            zyrtec: {
                dosage: "10mg",
                limit: 1,
                directions:"Do not take more than one 10 mg tablet in 24 hours"
            },
            desc:"It can treat hay fever and\nallergy symptoms, hives, and itching"
        },
        {
            ambien: {
                dosage:"10mg",
                limit:1,
                directions:"One tablet before bed"
            },
            desc: "Treats anxiety and panic disorder."
        },
        {
            benadryl: {
                dosage:"25mg",
                limit:6,
                directions:"Take two tablets every 4 to 6 hours."
            },
            desc:"Treats hay fever, allergies,\ncold symptoms, and insomnia."
        },
        {
            aspirin: {
                dosage:"325mg",
                limit:12,
                directions:"1 or 2 every 4 hours. Do not exceed 12."
            },
            desc:"Treats pain, fever, headache,\nand inflammation. It can also reduce\nthe risk of heart attack"
        },
        {
            tylenol: {
                dosage:"500mg",
                limit:"6",
                directions:"Take 2 tablets every 6 hours"
            },
            desc:"It can treat minor aches\nand pains, and reduces fever."
        }
    ];

    addRecent(obj) {
        this.recent.unshift(obj);
    }

    receiveRecent() {
        return this.recent;
    }

    updateRecent(arr) {
        this.recent = arr;
    }

    receiveLibrary() {
        return this.library;
    }

    updateCabinet(arr) {
        this.cabinet = arr;
    }

    receiveCabinet() {
        return this.cabinet;
    }
}