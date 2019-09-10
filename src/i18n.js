import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import frases from "./phrases/main";

const resources = frases;

i18n.use(initReactI18next).init({
	resources,
    lng: "es",
    fallbackLng: "es",
    debug: true,
	keySeparator: true,
	interpolation: {
		escapeValue: false
	}
});

export default i18n;
