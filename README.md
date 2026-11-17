# Zizi - Queering the Dataset

הבינה המלאכותית מאפשרת לנו ללמוד על העבר ולחוות אותו בצורה מוחשית אך מן הצד השני היא עלולה לשבש אותו.


הפרויקט **Zizi – Queering the Dataset** (2019) של האמן Jake Elwes, דן בשאלה כיצד הארכיון שעליו מאומן מודל בינה מלאכותית קובע את מה שיכול להופיע במרחב הלטנטי שלו.

בעמוד המוצג, מוצג תרחיש של עבר אפשרי המתבסס על אימון מודלי הבינה על תמונות של מלכות דראג.

**לצפייה בעמוד:** https://liranamar.github.io/zizi/

## מבנה העמוד

העמוד בנוי משלושה פריימים, וכל אחד מהם ממלא את המסך:

1. **פתיחה:** קטע וידאו מתוך העבודה, דיוקן של האמן וטקסט על המרחב הלטנטי, על הוספת תמונות הדראג למאגר FFHQ ועל הגליץ' כאסטרטגיה אמנותית.
2. **חיפוש:** הדמיה של חיפוש בגוגל בעתיד רחוק. שורת החיפוש ריקה וסמן מהבהב בה, ואחרי כמה שניות מוקלדת השאילתה *"Oil portrait of a 16th century Italian noble family"* ונשלחת.
3. **תוצאות:** עמוד תוצאות תמונות שאפשר לגלול בו, כמו בגוגל. בין הדיוקנאות ההיסטוריים האמיתיים שתולים דיוקנאות קוויריים שנוצרו בבינה מלאכותית, כאילו הארכיון כבר השתנה. לחיצה על תמונה פותחת אותה בהרחבה בחלונית צד, כמו בגוגל.

## תהליך יצירת הדימויים

הדיוקנאות השתולים נוצרו בשלושה כלים: **Midjourney**, **ChatGPT** ו-**Freepik**. המטרה הייתה ליצור דיוקנאות שייראו כמו ציורי שמן אמיתיים מפירנצה של המאה ה-16, כך שיוכלו להשתלב בין הדיוקנאות ההיסטוריים בלי שיבלטו. כך הם מציגים "עבר חלופי": יצירות מופת נשכחות שבהן מלכות דראג מצוירות כדמויות אצולה.

### הפרומפט

```
A fictional Renaissance oil painting from Florence, circa 1520, depicting a majestic androgynous drag queen as a powerful aristocratic figure. The subject sits confidently on an ornate wooden chair, wearing luxurious Renaissance garments, embroidered velvet, pearls, elaborate jewelry and theatrical yet refined drag makeup. A commanding direct gaze, subtle gender ambiguity, dignified royal posture. Classical Italian Renaissance portrait composition, delicate sfumato, rich pigments, realistic oil paint texture, aged canvas, dramatic natural lighting, dark architectural background, historically inspired details. The painting should appear to belong in a major European art museum, as if it were a forgotten masterpiece from an alternative history. No modern objects, no text, no photographic appearance. --ar 3:4 --stylize 150
```

כמה בחירות בפרומפט:
- **מקום וזמן מדויקים** (פירנצה, בערך 1520), כדי שהדימוי יתאים לשאילתה שבעמוד ולדיוקנאות האמיתיים שסביבו.
- **ערפול מגדרי עדין** ואיפור דראג "תיאטרלי אך מעודן", כדי שהדמות תיראה חלק טבעי מהמסורת הציורית ולא כמו פארודיה עליה.
- **מרקם של שמן על בד מזדקן, סְפוּמָטוֹ ותאורה דרמטית**, כדי שהתוצר ייראה כמו ציור ולא כמו צילום.
- **"Forgotten masterpiece from an alternative history"**, המשפט שמבטא את רעיון העבודה: הבינה המלאכותית לא משחזרת את העבר אלא כותבת אותו מחדש.
- `--ar 3:4` (יחס של דיוקן) ו-`--stylize 150` הם פרמטרים של Midjourney.

### תוצרים

<p>
  <img src="assets/process/p1.jpg" width="180">
  <img src="assets/process/p2.jpg" width="180">
  <img src="assets/process/p3.jpg" width="180">
  <img src="assets/process/p4.jpg" width="180">
  <img src="assets/process/p5.jpg" width="180">
  <img src="assets/process/p6.jpg" width="180">
  <img src="assets/process/p7.jpg" width="180">
  <img src="assets/process/p8.jpg" width="180">
</p>

מתוך התוצרים נבחרו הדימויים ששתולים בעמוד התוצאות (`assets/r1.jpg`–`r6.jpg`).

## מבנה הקבצים

| קובץ / תיקייה | תפקיד |
|---|---|
| `index.html` | מבנה העמוד |
| `styles.css` | עיצוב. כל פריים מעוצב לפי מסגרת של 1920×1080 ומתכוונן לגודל המסך |
| `script.js` | אנימציית ההקלדה, בניית רשת התוצאות וחלונית ההרחבה |
| `grid-data.js` | רשימת הדיוקנאות ההיסטוריים ברשת: קובץ, כותרת ומקור |
| `assets/` | צילומי המסך של גוגל, דיוקן האמן ו-`r1`–`r6`, התמונות השתולות |
| `assets/grid/` | הדיוקנאות ההיסטוריים |
| `assets/process/` | תוצרי תהליך היצירה שמוצגים ב-README |

## עריכה

- **שינוי השאילתה או התזמון:** בראש הקובץ `script.js` (`QUERY`, `WAIT_BEFORE_TYPING`).
- **הכותרות, המקורות והמיקום של התמונות השתולות:** ברשימה `PLANTED` שבקובץ `script.js`.
- **אחרי שינוי ב-CSS או ב-JS:** צריך להעלות את מספר הגרסה בקישורים שב-`index.html` (למשל `styles.css?v=5` ל-`v=6`), כדי שהדפדפן לא יציג גרסה שמורה ישנה.

אין צורך בהתקנה או בבנייה. כדי לראות את העמוד מקומית פותחים את `index.html` בדפדפן, ו-GitHub Pages מעדכן את האתר החי אחרי כל push ל-`main`.

## קרדיטים

- **Zizi – Queering the Dataset**, Jake Elwes, 2019. הווידאו מוטמע מ-Vimeo.
- הטקסט נשען על טענתו של אנטוניו סומאיני (Antonio Somaini) על המרחב הלטנטי.
- הדיוקנאות ההיסטוריים ברשת התוצאות נלקחו מ-[Wikimedia Commons](https://commons.wikimedia.org) והם בנחלת הכלל.
- התמונות השתולות (`assets/r1.jpg`–`r6.jpg`) נוצרו בבינה מלאכותית במסגרת הפרויקט, ב-Midjourney, ChatGPT ו-Freepik (ראו "תהליך יצירת הדימויים").
- ממשק הדפדפן וגוגל בפריימים 2–3 הם הדמיה לצורך העבודה, על בסיס צילומי מסך.
