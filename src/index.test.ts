// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { rescaleScmlFile, rescaleScmlContent } from './index';

const testInput = `
<?xml version="1.0" encoding="UTF-8"?>
<spriter_data scml_version="1.0" generator="BrashMonkey Spriter" generator_version="r11">
    <folder id="0">
        <file id="0" name="object1.png" width="109" height="114" pivot_x="0" pivot_y="1"/>
        <file id="1" name="object2.png" width="40" height="40" pivot_x="0" pivot_y="1"/>
    </folder>
    <entity id="0" name="entity_000">
        <obj_info name="bone_000" type="bone" w="28.6989" h="10"/>
        <obj_info name="bone_001" type="bone" w="87.401" h="10"/>
        <obj_info name="bone_002" type="bone" w="106.964" h="10"/>
        <obj_info name="bone_003" type="bone" w="64.3493" h="10"/>
        <obj_info name="bone_004" type="bone" w="85.6919" h="10"/>
        <animation id="0" name="NewAnimation" length="3000" interval="100">
            <mainline>
                <key id="0">
                    <bone_ref id="0" timeline="6" key="0"/>
                    <bone_ref id="1" parent="0" timeline="7" key="0"/>
                    <bone_ref id="2" parent="0" timeline="8" key="0"/>
                    <bone_ref id="3" parent="0" timeline="9" key="0"/>
                    <bone_ref id="4" parent="0" timeline="10" key="0"/>
                    <object_ref id="0" timeline="2" key="0" z_index="0"/>
                    <object_ref id="1" timeline="0" key="0" z_index="1"/>
                    <object_ref id="2" parent="3" timeline="1" key="0" z_index="2"/>
                    <object_ref id="3" parent="2" timeline="3" key="0" z_index="3"/>
                    <object_ref id="4" parent="4" timeline="4" key="0" z_index="4"/>
                    <object_ref id="5" parent="1" timeline="5" key="0" z_index="5"/>
                </key>
                <key id="1" time="750">
                    <bone_ref id="0" timeline="6" key="1"/>
                    <bone_ref id="1" parent="0" timeline="7" key="0"/>
                    <bone_ref id="2" parent="0" timeline="8" key="0"/>
                    <bone_ref id="3" parent="0" timeline="9" key="0"/>
                    <bone_ref id="4" parent="0" timeline="10" key="0"/>
                    <object_ref id="0" timeline="2" key="0" z_index="0"/>
                    <object_ref id="1" timeline="0" key="0" z_index="1"/>
                    <object_ref id="2" parent="3" timeline="1" key="0" z_index="2"/>
                    <object_ref id="3" parent="2" timeline="3" key="0" z_index="3"/>
                    <object_ref id="4" parent="4" timeline="4" key="0" z_index="4"/>
                    <object_ref id="5" parent="1" timeline="5" key="0" z_index="5"/>
                </key>
                <key id="2" time="1500" curve_type="cubic" c1="0.706468" c2="0.78607">
                    <bone_ref id="0" timeline="6" key="2"/>
                    <bone_ref id="1" parent="0" timeline="7" key="1"/>
                    <bone_ref id="2" parent="0" timeline="8" key="1"/>
                    <bone_ref id="3" parent="0" timeline="9" key="1"/>
                    <bone_ref id="4" parent="0" timeline="10" key="1"/>
                    <object_ref id="0" timeline="2" key="1" z_index="0"/>
                    <object_ref id="1" timeline="0" key="1" z_index="1"/>
                    <object_ref id="2" parent="3" timeline="1" key="1" z_index="2"/>
                    <object_ref id="3" parent="2" timeline="3" key="1" z_index="3"/>
                    <object_ref id="4" parent="4" timeline="4" key="1" z_index="4"/>
                    <object_ref id="5" parent="1" timeline="5" key="1" z_index="5"/>
                </key>
            </mainline>
            <timeline id="0" name="object1">
                <key id="0" spin="0">
                    <object folder="0" file="0" x="-54.223101" y="215.801131"/>
                </key>
                <key id="1" time="1500" spin="0">
                    <object folder="0" file="0" x="-54.223101" y="157.801131"/>
                </key>
            </timeline>
            <timeline id="1" name="object2">
                <key id="0" spin="0">
                    <object folder="0" file="1" x="72.229964" y="-19.533164" angle="90.387128" scale_x="0.063475" scale_y="0.065463"/>
                </key>
                <key id="1" time="1500" spin="0">
                    <object folder="0" file="1" x="38.732849" y="-20.267103" angle="90.387128" scale_x="0.063475" scale_y="0.065463"/>
                </key>
            </timeline>
        </animation>
    </entity>
</spriter_data>
`;

const expectedOutput = `
<?xml version="1.0" encoding="UTF-8"?>
<spriter_data scml_version="1.0" generator="BrashMonkey Spriter" generator_version="r11">
    <folder id="0">
        <file id="0" name="object1.png" width="109" height="114" pivot_x="0" pivot_y="1"/>
        <file id="1" name="object2.png" width="40" height="40" pivot_x="0" pivot_y="1"/>
    </folder>
    <entity id="0" name="entity_000">
        <obj_info name="bone_000" type="bone" w="28.6989" h="10"/>
        <obj_info name="bone_001" type="bone" w="87.401" h="10"/>
        <obj_info name="bone_002" type="bone" w="106.964" h="10"/>
        <obj_info name="bone_003" type="bone" w="64.3493" h="10"/>
        <obj_info name="bone_004" type="bone" w="85.6919" h="10"/>
        <animation id="0" name="NewAnimation" length="3000" interval="100">
            <mainline>
                <key id="0">
                    <bone_ref id="0" timeline="6" key="0"/>
                    <bone_ref id="1" parent="0" timeline="7" key="0"/>
                    <bone_ref id="2" parent="0" timeline="8" key="0"/>
                    <bone_ref id="3" parent="0" timeline="9" key="0"/>
                    <bone_ref id="4" parent="0" timeline="10" key="0"/>
                    <object_ref id="0" timeline="2" key="0" z_index="0"/>
                    <object_ref id="1" timeline="0" key="0" z_index="1"/>
                    <object_ref id="2" parent="3" timeline="1" key="0" z_index="2"/>
                    <object_ref id="3" parent="2" timeline="3" key="0" z_index="3"/>
                    <object_ref id="4" parent="4" timeline="4" key="0" z_index="4"/>
                    <object_ref id="5" parent="1" timeline="5" key="0" z_index="5"/>
                </key>
                <key id="1" time="750">
                    <bone_ref id="0" timeline="6" key="1"/>
                    <bone_ref id="1" parent="0" timeline="7" key="0"/>
                    <bone_ref id="2" parent="0" timeline="8" key="0"/>
                    <bone_ref id="3" parent="0" timeline="9" key="0"/>
                    <bone_ref id="4" parent="0" timeline="10" key="0"/>
                    <object_ref id="0" timeline="2" key="0" z_index="0"/>
                    <object_ref id="1" timeline="0" key="0" z_index="1"/>
                    <object_ref id="2" parent="3" timeline="1" key="0" z_index="2"/>
                    <object_ref id="3" parent="2" timeline="3" key="0" z_index="3"/>
                    <object_ref id="4" parent="4" timeline="4" key="0" z_index="4"/>
                    <object_ref id="5" parent="1" timeline="5" key="0" z_index="5"/>
                </key>
                <key id="2" time="1500" curve_type="cubic" c1="0.706468" c2="0.78607">
                    <bone_ref id="0" timeline="6" key="2"/>
                    <bone_ref id="1" parent="0" timeline="7" key="1"/>
                    <bone_ref id="2" parent="0" timeline="8" key="1"/>
                    <bone_ref id="3" parent="0" timeline="9" key="1"/>
                    <bone_ref id="4" parent="0" timeline="10" key="1"/>
                    <object_ref id="0" timeline="2" key="1" z_index="0"/>
                    <object_ref id="1" timeline="0" key="1" z_index="1"/>
                    <object_ref id="2" parent="3" timeline="1" key="1" z_index="2"/>
                    <object_ref id="3" parent="2" timeline="3" key="1" z_index="3"/>
                    <object_ref id="4" parent="4" timeline="4" key="1" z_index="4"/>
                    <object_ref id="5" parent="1" timeline="5" key="1" z_index="5"/>
                </key>
            </mainline>
            <timeline id="0" name="object1">
                <key id="0" spin="0">
                    <object folder="0" file="0" x="-54.223101" y="215.801131" scale_x="2.0" scale_y="2.0"/>
                </key>
                <key id="1" time="1500" spin="0">
                    <object folder="0" file="0" x="-54.223101" y="157.801131" scale_x="2.0" scale_y="2.0"/>
                </key>
            </timeline>
            <timeline id="1" name="object2">
                <key id="0" spin="0">
                    <object folder="0" file="1" x="72.229964" y="-19.533164" angle="90.387128" scale_x="0.063475" scale_y="0.130926"/>
                </key>
                <key id="1" time="1500" spin="0">
                    <object folder="0" file="1" x="38.732849" y="-20.267103" angle="90.387128" scale_x="0.063475" scale_y="0.130926"/>
                </key>
            </timeline>
        </animation>
    </entity>
</spriter_data>
`;

describe('rescaleScmlFile', () => {
    it('should perform the expected transform', () => {
        const output = rescaleScmlContent(testInput, 2.0, () => {})
        expect(output).toEqual(expectedOutput);
    })
})