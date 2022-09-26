import { environment } from "../../../environments/environment";

const devContents = {
  mcq: [
    { id: 'do_213630162487689216137', name: 'MCQ Question Set 1', category: 'vertical' },
    { id: 'do_213633024930529280150', name: 'MCQ Question Set 2', category: 'vertical' },
    { id: 'do_213633028694933504159', name: 'Horizontal Layout QuestionSet 1', category: 'horizontal' },
    { id: 'do_213633032251006976168', name: 'Grid layout QuestionSet 1', category: 'grid' }
  ],
  sa: [
    { id: 'do_213633042323161088177', name: 'Subjective question set 1' },
    { id: 'do_213633045549064192186', name: 'Subjective question set 2' }
  ]
}

const stagingContents = {
  mcq: [
    { id: 'do_213536668306825216155', name: 'MCQ Question Set 1', category: 'vertical' },
    { id: 'do_213536734487494656178', name: 'MCQ Question Set 2', category: 'vertical' },
    { id: 'do_213471560301830144119', name: 'Vivek Questionset', category: 'vertical' },
    { id: 'do_2135395279401615361226', name: 'Horizontal Layout Question Set 1', category: 'horizontal' },
    { id: 'do_2135395367682211841241', name: 'Grid Layout Question Set 1', category: 'grid' },
    { id: 'do_213484313936035840138', name: 'Vivek Test questionset', category: 'vertical' },
    { id: 'do_21337242850730803211', name: 'vivek-questionset-progress-bar', category: 'vertical' },
    { id: 'do_213521052524797952167', name: 'Talkback-question set', category: 'vertical' }
  ],
  sa: [
    { id: 'do_213536742733381632187', name: 'Subjective question set 1' },
    { id: 'do_213536749100793856196', name: 'Subjective question set 2' }
  ]
};

export const SampleContentList: any = environment.baseUrl.includes('staging') ? stagingContents : devContents;
