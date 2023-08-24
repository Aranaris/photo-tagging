import pandas as pd
import pathlib
import json

label_df = pd.read_csv("/Users/vinceye/fiftyone/open-images-v6/validation/metadata/classes.csv", header=None)
images_df = pd.read_csv("/Users/vinceye/fiftyone/open-images-v6/validation/metadata/image_ids.csv")
classifications_df = pd.read_csv("/Users/vinceye/fiftyone/open-images-v6/validation/labels/detections.csv")

# print(label_df)
# print(images_df)
# print(classifications_df)
images_obj = {}
images_obj['images'] = []

for filename in pathlib.Path('/Users/vinceye/fiftyone/open-images-v6/validation/data').iterdir():
    image_id = filename.name.removesuffix('.jpg')
    tags_df = classifications_df.loc[classifications_df['ImageID'] == image_id]
    tag_list = []
    for _, label in tags_df.iterrows():
        # print(label)
        obj = {}
        start = [label['XMin'],label['YMin']]
        end = [label['XMax'],label['YMax']]
        obj['start'] = start
        obj['end'] = end
        # print(obj)
        name_df = label_df.loc[label_df[0] == label['LabelName']]
        obj['name'] = name_df.iloc[0][1]
        tag_list.append(obj)
    # print(tags_df)
    # print(tag_list)
    tag_obj = {}
    tag_obj['image'] = image_id
    tag_obj['tags'] = tag_list
    images_obj['images'].append(tag_obj)

output = json.dumps(images_obj)

with open("sample.json", "w") as outfile:
    outfile.write(output)
# for image_id in images_df['ImageID']:
#     print(image_id)
#     break