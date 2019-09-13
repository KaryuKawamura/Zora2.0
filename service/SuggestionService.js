class SuggestionService {
    constructor(knex) {
        this.knex = knex;
    };

    listSuggest(horoscope, gender) {
        console.log(horoscope, gender);
        let horoscope_id = this.knex.select("id").from("horoscope").where({ horoscope: horoscope });

        return horoscope_id.then(actualHoroscope => {
            console.log(actualHoroscope)
            let query = this.knex("clothes")
                .select("clothes_id", "name", "price", "img", "gender_id")
                .where({gender_id: gender})
                .andWhere({ horoscope_id: actualHoroscope[0].id })
                .orderBy("price", "desc")
                .limit(3);

            return query.then(data => {
                console.log('got the suggestion data')
                return data;
            });
        })
    };
};

module.exports = SuggestionService;