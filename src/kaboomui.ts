import { KaboomCtx } from "kaboom";



// PLUGIN
function kaboomuiPlugin(k: KaboomCtx) {
	// COMPONENTS
	// TODO: maybe we should separate in many components like
	// editableBoxComp
	// checkboxComp
	// etc, so people can add elements without a box
	function boxComp() {
		return {
			setTitle(text: string) {
				this.get("boxTitle")[0].text = text;
			},

			addEditableText(text: string, defaultValue: string, setter: any) {
				const quote = this.add([
					k.pos(6, 20 + (30 * this.get("boxElement").length)),
					k.text(text, { size: 20 }),
					// todo: make customizable
					k.color(k.BLACK),
					"boxElement",
				]);

				k.add([
					k.pos(this.pos.add(quote.pos).add(140, 0)),
					k.text(defaultValue ?? "0", { size: 20 }),
					k.color(k.BLACK),
					k.area({ scale: 1.2 }),
					"boxElement",
					"boxEditableText",
					{
						set(v) {
							setter(v);
						}
					}
				]);
			},

			addCheckbox(t, defaultValue, action) {
				const quote = this.add([
					k.pos(6, 30 + (20 * this.get("boxElement").length)),
					k.anchor("left"),
					k.text(t, { size: 20 }),
					k.color(k.BLACK),
					"boxElement",
				]);

				const checkbox = k.add([
					k.pos(this.pos.add(quote.pos).add(160, 0)),
					k.anchor("center"),
					k.rect(20, 20),
					k.color(255, 255, 255),
					k.outline(2),
					k.area({ scale: 1.2 }),
					"boxElement",
					"boxCheckbox",
					{
						status: defaultValue ?? false,
						setStatus: (v: any) => { },
						action,
					}
				]);

				const mark1 = k.add([
					k.pos(checkbox.pos),
					k.rotate(45),
					k.anchor("center"),
					k.rect(2, 20),
					k.color(k.BLACK),
					k.opacity(defaultValue ? 1 : 0),
				]);

				const mark2 = k.add([
					k.pos(checkbox.pos),
					k.rotate(-45),
					k.anchor("center"),
					k.rect(2, 20),
					k.color(k.BLACK),
					k.opacity(defaultValue ? 1 : 0),
				]);

				checkbox.setStatus = (v) => {
					checkbox.status = v;

					if (v) {
						mark1.use(k.opacity(1));
						mark2.use(k.opacity(1));
					}
					else {
						mark1.use(k.opacity(0));
						mark2.use(k.opacity(0));
					}
				};

				checkbox.onClick(() => {
					checkbox.setStatus(!checkbox.status);
					checkbox.action(checkbox.status);
				});
			},
		};
	}

	function uiAddBox(width: number, height: number, pos: number) {
		let center = k.vec2(width / 2, height / 2);

		const box = k.add([
			k.pos(pos),
			boxComp(),
		]);

		box.add([
			k.rect(width, height),
			k.outline(4),
		]);

		box.add([
			k.pos(center.x, 20),
			k.anchor("center"),
			k.text(""),
			// todo: customize color
			k.color(0, 0, 0),
			"boxTitle",
			"boxElement",
		]);

		return box;
	}

	// PLUGIN EXPORTS
	return {
		uiAddBox,
	};
}



