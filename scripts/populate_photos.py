import pandas as pd
import pathlib
import json
from datetime import datetime

label_df = pd.read_csv("/Users/vinceye/fiftyone/open-images-v6/validation/metadata/classes.csv", header=None)
images_df = pd.read_csv("/Users/vinceye/fiftyone/open-images-v6/validation/metadata/image_ids.csv")
classifications_df = pd.read_csv("/Users/vinceye/fiftyone/open-images-v6/validation/labels/detections.csv")

images_obj = {
    'images': [],
}

for filename in pathlib.Path('/Users/vinceye/fiftyone/open-images-v6/validation/data').iterdir():
    image_id = filename.name.removesuffix('.jpg')
    tags_df = classifications_df.loc[classifications_df['ImageID'] == image_id]
    tag_list = []
    for _, label in tags_df.iterrows():
        name_df = label_df.loc[label_df[0] == label['LabelName']]
        obj = {
            'start': [label['XMin'],label['YMin']],
            'end': [label['XMax'],label['YMax']],
            'name': name_df.iloc[0][1],
        }
        tag_list.append(obj)

    now = datetime.now()
    tag_obj = {
        'image': image_id,
        'tags': tag_list,
        'created': now.strftime("%Y-%m-%d %H:%M:%S"),
    }

    images_obj['images'].append(tag_obj)

with open("./scripts/sample.json", "w") as outfile:
    json.dump(images_obj, outfile, indent="\t")