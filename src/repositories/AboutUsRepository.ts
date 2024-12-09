import db from '../models';

const AboutUs = db.AboutUs;

class AboutUsRepository {
    async find() {
        return AboutUs.findByPk(1); // Assuming there's only one "About Us" record
    }

    async createOrUpdate(content: string) {
        const [aboutUs, created] = await AboutUs.findOrCreate({
            where: { id: 1 },
            defaults: { content },
        });

        if (!created) {
            await aboutUs.update({ content });
        }

        return aboutUs;
    }

}

export default new AboutUsRepository();
